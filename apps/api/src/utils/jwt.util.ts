import jwt from 'jsonwebtoken';
import { JwtPayload, RoleType } from '@ums/types';

const JWT_SECRET = process.env.JWT_SECRET || 'ums_dev_access_token_secret_replace_in_production_key_32bytes!';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'ums_dev_refresh_token_secret_replace_in_production_key_32bytes!';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

export const generateAccessToken = (payload: {
  userId: string;
  email: string;
  roles: RoleType[];
}): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN as any,
  });
};

export const generateRefreshToken = (payload: { userId: string }): string => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN as any,
  });
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};

export const verifyRefreshToken = (token: string): { userId: string } => {
  return jwt.verify(token, JWT_REFRESH_SECRET) as { userId: string };
};
