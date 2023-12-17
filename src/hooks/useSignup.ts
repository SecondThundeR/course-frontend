import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useLocalStorage } from '@mantine/hooks';

import { SignupInput } from '@/__generated__/graphql';

import { SIGNUP_MUTATION } from '@/constants/mutation';
import { CHAT_ROUTE } from '@/constants/routes';

function useSignup() {
  const navigate = useNavigate();
  const [signupUser, { loading, error }] = useMutation(SIGNUP_MUTATION);
  const [, setAccessToken] = useLocalStorage({
    key: 'accessToken',
  });
  const [, setRefreshToken] = useLocalStorage({
    key: 'refreshToken',
  });

  const onSignup = useCallback(async (signupData: SignupInput) => {
    const res = await signupUser({
      variables: {
        data: signupData,
      },
    });
    if (!res.data) return;

    const {
      data: {
        signup: { accessToken, refreshToken },
      },
    } = res;

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);

    return navigate(CHAT_ROUTE);
  }, []);

  return [onSignup, { loading, error }] as const;
}

export default useSignup;
