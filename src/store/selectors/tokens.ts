import { type TokensStore } from '../useTokensStore';

export const currentUserTokenSelector = (state: TokensStore) => ({
  accessToken: state.accessToken,
  resetTokens: state.resetTokens,
});
