import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { type CurrentUserQuery } from '@/__generated__/graphql';
import { createSelectors } from '@/utils/zustand/createSelectors';

export type User = CurrentUserQuery['currentUser'];

export type UserStore = {
  userData: User | null;
  setUserData: (user: User) => void;
  resetUserData: () => void;
};

const useUserStoreBase = create<UserStore>()(
  persist(
    (set) => ({
      userData: null,
      setUserData: (user) => set({ userData: user }),
      resetUserData: () => set({ userData: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useUserStore = createSelectors(useUserStoreBase);
