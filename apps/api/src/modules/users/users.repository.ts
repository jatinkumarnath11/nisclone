import prisma, { User, UserRoleEnum } from '@ums/database';

export class UsersRepository {
  async findAll(skip = 0, take = 20): Promise<User[]> {
    return prisma.user.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: {
        roles: {
          include: { role: true },
        },
      },
    });
  }

  async count(): Promise<number> {
    return prisma.user.count();
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
      include: {
        roles: {
          include: { role: true },
        },
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
      include: {
        roles: {
          include: { role: true },
        },
      },
    });
  }

  async create(data: {
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    roles: string[];
  }): Promise<User> {
    const roleRecords = await prisma.role.findMany({
      where: {
        name: { in: data.roles as UserRoleEnum[] },
      },
    });

    return prisma.user.create({
      data: {
        email: data.email,
        passwordHash: data.passwordHash,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        isActive: true,
        isEmailVerified: true,
        roles: {
          create: roleRecords.map((role) => ({
            roleId: role.id,
          })),
        },
      },
      include: {
        roles: {
          include: { role: true },
        },
      },
    });
  }
}

