import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { LoginInput } from '@/__generated__/graphql';

import { LOGIN_MUTATION } from '@/constants/mutation';
import { CHAT_ROUTE } from '@/constants/routes';

import { useTokensStore } from '@/store';

export default function useLogin() {
  const navigate = useNavigate();
  const { setTokens } = useTokensStore();
  const [loginUser, { loading, error }] = useMutation(LOGIN_MUTATION);

  const onLogin = useCallback(async (loginData: LoginInput) => {
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

    setTokens(accessToken, refreshToken);
    return navigate(CHAT_ROUTE);
  }, []);

  return [onLogin, { loading, error }] as const;
}
