import { RoleType } from './auth.js';

export interface UserSummary {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string | null;
  isActive: boolean;
  roles: RoleType[];
  createdAt: Date;
  updatedAt: Date;
}
