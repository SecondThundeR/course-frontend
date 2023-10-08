import { Token } from '@/__generated__/graphql';
import { CURRENT_USER } from '@/constants/queries';
import { ROOT_ROUTE } from '@/constants/routes';
import { useLazyQuery } from '@apollo/client';
import { useLocalStorage } from '@mantine/hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useMe() {
  const navigate = useNavigate();
  const [getUser, { data }] = useLazyQuery(CURRENT_USER);
  const [sessionValue, _, removeSessionValue] = useLocalStorage({
    key: 'session',
    getInitialValueInEffect: true,
    deserialize(value) {
      if (!value) return;
      return JSON.parse(value) as Pick<Token, 'accessToken' | 'refreshToken'>;
    },
  });

  const getUserData = async () => {
    if (!sessionValue) {
      removeSessionValue();
      return navigate(ROOT_ROUTE);
    }

    const fetchedData = await getUser({
      context: {
        headers: {
          authorization: `Bearer ${sessionValue.accessToken}`,
        },
      },
    });
    if (fetchedData !== null) return;

    removeSessionValue();
    navigate(ROOT_ROUTE);
  };

  useEffect(() => {
    getUserData().catch(console.error);
  }, []);

  return data;
}

export default useMe;
