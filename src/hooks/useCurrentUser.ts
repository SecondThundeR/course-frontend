import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@mantine/hooks';
import { useLazyQuery } from '@apollo/client';
import { CURRENT_USER } from '@/constants/queries';
import { ROOT_ROUTE } from '@/constants/routes';

function useCurrentUser() {
  const navigate = useNavigate();
  const [getUser, { data }] = useLazyQuery(CURRENT_USER);
  const [accessToken, setAccessToken, removeAccessToken] = useLocalStorage({
    key: 'accessToken',
    getInitialValueInEffect: false,
    deserialize(value) {
      if (!value) return null;
      return JSON.parse(value) as string;
    },
  });
  // TODO: Add access token update with refresh token
  const [refreshToken, setRefreshToken, removeRefreshToken] = useLocalStorage({
    key: 'refreshToken',
    getInitialValueInEffect: false,
    deserialize(value) {
      if (!value) return null;
      return JSON.parse(value) as string;
    },
  });

  const getUserData = useCallback(async () => {
    if (!accessToken) {
      return navigate(ROOT_ROUTE);
    }

    const res = await getUser({
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    });

    if (!res) throw new Error('Failed to fetch user data');
  }, []);

  const onSignout = useCallback(() => {
    removeAccessToken();
    removeRefreshToken();

    return navigate(ROOT_ROUTE);
  }, []);

  useEffect(() => {
    getUserData().catch(console.error);
  }, []);

  return [data, onSignout] as const;
}

export default useCurrentUser;
