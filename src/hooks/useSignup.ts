import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { type SignupInput } from '@/__generated__/graphql';

import { SIGNUP_MUTATION } from '@/constants/graphql/mutation';
import { CHAT_ROUTE } from '@/constants/routes';

import { useTokensStore } from '@/store';

import { useSignupForm } from './useSignupForm';

export function useSignup() {
  const form = useSignupForm();
  const setTokens = useTokensStore.use.setTokens();
  const [signupUser, { loading, error }] = useMutation(SIGNUP_MUTATION);
  const navigate = useNavigate();

  const onSignup = useCallback(
    async (signupData: SignupInput) => {
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

      setTokens(accessToken as string, refreshToken as string);
      navigate(CHAT_ROUTE);
    },
    [navigate, setTokens, signupUser]
  );

  const onSubmit = useMemo(() => form.onSubmit((values) => onSignup(values)), [form, onSignup]);

  return { form, onSubmit, loading, error };
}
