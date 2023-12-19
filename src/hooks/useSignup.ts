import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { SignupInput } from '@/__generated__/graphql';

import { SIGNUP_MUTATION } from '@/constants/mutation';
import { CHAT_ROUTE } from '@/constants/routes';

import { useTokensStore } from '@/store';

export default function useSignup() {
  const navigate = useNavigate();
  const { setTokens } = useTokensStore();
  const [signupUser, { loading, error }] = useMutation(SIGNUP_MUTATION);

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

    setTokens(accessToken, refreshToken);
    return navigate(CHAT_ROUTE);
  }, []);

  return [onSignup, { loading, error }] as const;
}
