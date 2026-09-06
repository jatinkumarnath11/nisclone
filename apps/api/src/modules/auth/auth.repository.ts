import prisma, { User, RefreshToken, UserRoleEnum } from '@ums/database';

export class AuthRepository {
  async findUserByEmail(email: string): Promise<(User & { roles: { role: { name: UserRoleEnum } }[] }) | null> {
    return prisma.user.findUnique({
      where: { email },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  async findUserById(id: string): Promise<(User & { roles: { role: { name: UserRoleEnum } }[] }) | null> {
    return prisma.user.findUnique({
      where: { id },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  async saveRefreshToken(userId: string, tokenHash: string, expiresAt: Date): Promise<RefreshToken> {
    return prisma.refreshToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt,
      },
    });
  }

  async findRefreshToken(tokenHash: string): Promise<RefreshToken | null> {
    return prisma.refreshToken.findUnique({
      where: { tokenHash },
    });
  }

  async revokeRefreshToken(tokenHash: string): Promise<void> {
    await prisma.refreshToken.updateMany({
      where: { tokenHash },
      data: { isRevoked: true },
    });
  }

  async revokeAllUserRefreshTokens(userId: string): Promise<void> {
    await prisma.refreshToken.updateMany({
      where: { userId },
      data: { isRevoked: true },
    });
  }
}
