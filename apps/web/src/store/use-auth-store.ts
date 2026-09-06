import { create } from 'zustand';

interface UserState {
  userId: string | null;
  email: string | null;
  roles: string[];
  isAuthenticated: boolean;
  setUser: (user: { userId: string; email: string; roles: string[] }) => void;
  clearUser: () => void;
}

export const useAuthStore = create<UserState>((set) => ({
  userId: null,
  email: null,
  roles: [],
  isAuthenticated: false,
  setUser: (user) =>
    set({
      userId: user.userId,
      email: user.email,
      roles: user.roles,
      isAuthenticated: true,
    }),
  clearUser: () =>
    set({
      userId: null,
      email: null,
      roles: [],
      isAuthenticated: false,
    }),
}));
