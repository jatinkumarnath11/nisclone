import { UsersRepository } from './users.repository';
import { NotFoundError, ConflictError } from '../../utils/errors.util';
import { hashPassword } from '../../utils/password.util';
import { RegisterUserInput } from '@ums/validation';

export class UsersService {
  constructor(private usersRepo: UsersRepository) {}

  async listUsers(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.usersRepo.findAll(skip, limit),
      this.usersRepo.count(),
    ]);

    return {
      items: items.map((user: any) => ({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        roles: user.roles?.map((r: any) => r.role?.name || r.role) || [],
        isActive: user.isActive,
        createdAt: user.createdAt,
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getUserById(id: string) {
    const user = await this.usersRepo.findById(id);
    if (!user) {
      throw new NotFoundError(`User with ID ${id} not found`);
    }
    const { passwordHash: _, ...safeUser } = user as any;
    return {
      ...safeUser,
      roles: (user as any).roles?.map((r: any) => r.role?.name || r.role) || [],
    };
  }

  async createUser(input: RegisterUserInput) {
    const existing = await this.usersRepo.findByEmail(input.email);
    if (existing) {
      throw new ConflictError(`User with email "${input.email}" already exists`);
    }

    const hashedPassword = await hashPassword(input.password);

    const user = await this.usersRepo.create({
      email: input.email,
      passwordHash: hashedPassword,
      firstName: input.firstName,
      lastName: input.lastName,
      phoneNumber: input.phoneNumber,
      roles: input.roles,
    });

    const { passwordHash: _, ...safeUser } = user as any;
    return {
      ...safeUser,
      roles: (user as any).roles?.map((r: any) => r.role?.name || r.role) || [],
    };
  }
}

