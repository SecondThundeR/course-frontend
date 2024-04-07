import { createSelectors } from '@/utils/zustand/createSelectors';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type TokensStore = {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  resetTokens: () => void;
};

export const useTokensStoreBase = create<TokensStore>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
      resetTokens: () => set({ accessToken: null, refreshToken: null }),
    }),
    {
      name: 'tokens-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useTokensStore = createSelectors(useTokensStoreBase);
