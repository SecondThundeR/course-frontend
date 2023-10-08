import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useLocalStorage } from '@mantine/hooks';

import { LoginInput } from '@/__generated__/graphql';

import { LOGIN_MUTATION } from '@/constants/mutation';
import { CHAT_ROUTE } from '@/constants/routes';

function useLogin() {
  const navigate = useNavigate();
  const [loginUser, { loading, error }] = useMutation(LOGIN_MUTATION);
  const [_, setSessionValue] = useLocalStorage({
    key: 'session',
  });

  const onLogin = async (loginData: LoginInput) => {
    const data = await loginUser({
      variables: {
        data: loginData,
      },
    });
    if (!data.data) return;

    const {
      data: {
        login: { accessToken, refreshToken },
      },
    } = data;

    setSessionValue(JSON.stringify({ accessToken, refreshToken }));
    return navigate(CHAT_ROUTE);
  };

  return [onLogin, { loading, error }] as const;
}

export default useLogin;
