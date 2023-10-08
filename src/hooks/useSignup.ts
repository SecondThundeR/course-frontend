import { SignupInput } from '@/__generated__/graphql';
import { SIGNUP_MUTATION } from '@/constants/mutation';
import { CHAT_ROUTE } from '@/constants/routes';
import { useMutation } from '@apollo/client';
import { useLocalStorage } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';

function useSignup() {
  const navigate = useNavigate();
  const [signupUser, { loading, error }] = useMutation(SIGNUP_MUTATION);
  const [_, setSessionValue] = useLocalStorage({
    key: 'session',
  });

  const onSignup = async (signupData: SignupInput) => {
    const data = await signupUser({
      variables: {
        data: signupData,
      },
    });
    if (!data.data) return;

    const {
      data: {
        signup: { accessToken, refreshToken },
      },
    } = data;

    setSessionValue(JSON.stringify({ accessToken, refreshToken }));
    return navigate(CHAT_ROUTE);
  };

  return [onSignup, { loading, error }] as const;
}

export default useSignup;
