import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useLocalStorage } from '@mantine/hooks';

import { LoginInput } from '@/__generated__/graphql';

import { LOGIN_MUTATION } from '@/constants/mutation';
import { CHAT_ROUTE } from '@/constants/routes';

function useLogin() {
  const navigate = useNavigate();
  const [loginUser, { loading, error }] = useMutation(LOGIN_MUTATION);
  const [, setAccessToken] = useLocalStorage({
    key: 'accessToken',
  });
  const [, setRefreshToken] = useLocalStorage({
    key: 'refreshToken',
  });

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

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);

    return navigate(CHAT_ROUTE);
  }, []);

  return [onLogin, { loading, error }] as const;
}

export default useLogin;
