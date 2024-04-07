import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { type LoginInput } from '@/__generated__/graphql';

import { LOGIN_MUTATION } from '@/constants/graphql/mutation';
import { PAGE_STATUS } from '@/constants/pageStatus';
import { CHAT_ROUTE } from '@/constants/routes';

import { useTokensStore } from '@/store';

export function useLogin() {
  const setTokens = useTokensStore.use.setTokens();
  const [loginUser, { loading, error }] = useMutation(LOGIN_MUTATION);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const pageStatus = searchParams.get('status');
  const isSessionExpired = pageStatus === PAGE_STATUS.sessionExpired;
  const isNotLoggedIn = pageStatus === PAGE_STATUS.notLoggedIn;

  const onLogin = useCallback(
    async (loginData: LoginInput) => {
      setSearchParams(undefined);

      const res = await loginUser({
        variables: {
          data: loginData,
        },
      });
      if (!res.data) return;

      const {
        data: {
          login: { accessToken, refreshToken },
        },
      } = res;

      setTokens(accessToken as string, refreshToken as string);
      navigate(CHAT_ROUTE);
    },
    [loginUser, navigate, setSearchParams, setTokens]
  );

  return { onLogin, isSessionExpired, isNotLoggedIn, loading, error };
}
