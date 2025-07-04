import { User } from '@/types';
import { create } from 'zustand';
interface UserState {
  user: User | null;
  loading: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserState>(set => ({
  user: null,
  loading: true,
  setUser: user => set({ user }),
  clearUser: () => set({ user: null }),
  setLoading: loading => set({ loading }),
}));
