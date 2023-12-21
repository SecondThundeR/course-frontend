import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { type LoginInput } from '@/__generated__/graphql';

import { LOGIN_MUTATION } from '@/constants/mutation';
import { CHAT_ROUTE } from '@/constants/routes';

import { useTokensStore } from '@/store';

export default function useLogin() {
  const navigate = useNavigate();
  const { setTokens } = useTokensStore();
  const [loginUser, { loading, error }] = useMutation(LOGIN_MUTATION);

  const onLogin = useCallback(
    async (loginData: LoginInput) => {
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
    [loginUser, navigate, setTokens]
  );

  return [onLogin, { loading, error }] as const;
}
