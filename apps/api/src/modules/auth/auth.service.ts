import { AuthRepository } from './auth.repository';
import { comparePassword } from '../../utils/password.util';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt.util';
import { UnauthorizedError } from '../../utils/errors.util';
import { LoginInput } from '@ums/validation';
import { RoleType } from '@ums/types';
import crypto from 'crypto';

export class AuthService {
  constructor(private authRepo: AuthRepository) {}

  private hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  async login(input: LoginInput) {
    const user = await this.authRepo.findUserByEmail(input.email);
    if (!user || !user.isActive) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const isMatch = await comparePassword(input.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const roles = user.roles.map((r) => r.role.name as RoleType);

    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      roles,
    });

    const rawRefreshToken = generateRefreshToken({ userId: user.id });
    const tokenHash = this.hashToken(rawRefreshToken);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await this.authRepo.saveRefreshToken(user.id, tokenHash, expiresAt);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatarUrl: user.avatarUrl,
        roles,
      },
      tokens: {
        accessToken,
        refreshToken: rawRefreshToken,
        expiresIn: 900, // 15 mins in seconds
      },
    };
  }

  async refreshToken(rawRefreshToken: string) {
    const tokenHash = this.hashToken(rawRefreshToken);
    const storedToken = await this.authRepo.findRefreshToken(tokenHash);

    if (!storedToken || storedToken.isRevoked || storedToken.expiresAt < new Date()) {
      throw new UnauthorizedError('Refresh token expired or invalid');
    }

    // Revoke used token (token rotation)
    await this.authRepo.revokeRefreshToken(tokenHash);

    const user = await this.authRepo.findUserById(storedToken.userId);
    if (!user || !user.isActive) {
      throw new UnauthorizedError('User account not found or disabled');
    }

    const roles = user.roles.map((r) => r.role.name as RoleType);

    const newAccessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      roles,
    });

    const newRawRefreshToken = generateRefreshToken({ userId: user.id });
    const newTokenHash = this.hashToken(newRawRefreshToken);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await this.authRepo.saveRefreshToken(user.id, newTokenHash, expiresAt);

    return {
      accessToken: newAccessToken,
      refreshToken: newRawRefreshToken,
      expiresIn: 900,
    };
  }

  async logout(rawRefreshToken?: string, userId?: string) {
    if (rawRefreshToken) {
      const tokenHash = this.hashToken(rawRefreshToken);
      await this.authRepo.revokeRefreshToken(tokenHash);
    } else if (userId) {
      await this.authRepo.revokeAllUserRefreshTokens(userId);
    }
  }

  async getCurrentUser(userId: string) {
    const user = await this.authRepo.findUserById(userId);
    if (!user) {
      throw new UnauthorizedError('User profile not found');
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarUrl: user.avatarUrl,
      roles: user.roles.map((r) => r.role.name),
      isActive: user.isActive,
      createdAt: user.createdAt,
    };
  }
}
