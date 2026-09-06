export type RoleType =
  | 'ADMIN'
  | 'STUDENT'
  | 'PARENT'
  | 'FACULTY'
  | 'ACCOUNTANT'
  | 'TRANSPORT_STAFF'
  | 'HOSTEL_STAFF'
  | 'CANTEEN_STAFF';

export interface JwtPayload {
  userId: string;
  email: string;
  roles: RoleType[];
  sessionId?: string;
  iat?: number;
  exp?: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface UserSessionProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string | null;
  roles: RoleType[];
  permissions: string[];
}
