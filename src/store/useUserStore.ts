import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { type CurrentUserQuery } from '@/__generated__/graphql';

export type User = CurrentUserQuery['currentUser'];

type UserStore = {
  userData: User | null;
  setUserData: (user: User) => void;
  resetUserData: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userData: null,
      setUserData: (user) => set(() => ({ userData: user })),
      resetUserData: () => set(() => ({ userData: null })),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
