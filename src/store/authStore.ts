import { create } from 'zustand';
import { AuthState } from '../types';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: async (username: string) => {
    // In a real app, this would make an API call
    const userId = Math.random().toString(36).substring(7);
    set({ user: { id: userId, username } });
    localStorage.setItem('user', JSON.stringify({ id: userId, username }));
  },
  logout: () => {
    set({ user: null });
    localStorage.removeItem('user');
  },
}));