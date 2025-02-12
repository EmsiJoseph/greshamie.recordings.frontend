// authStore.ts
import { create } from 'zustand';

interface IUserWithToken {
    accessToken: { token: string; expiresAt: string };
    refreshToken: { token: string; expiresAt: string };
}

interface AuthState {
    auth: IUserWithToken | null;
    setAuth: (authData: IUserWithToken) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    auth: null,
    setAuth: (authData) => set({ auth: authData }),
}));