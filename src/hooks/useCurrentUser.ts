import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';

import { ROOT_ROUTE } from '@/constants/routes';
import { CURRENT_USER } from '@/constants/queries';

import { useTokensStore, useUserStore } from '@/store';

export default function useCurrentUser() {
  const navigate = useNavigate();
  const [getUser] = useLazyQuery(CURRENT_USER);
  const { userData, setUserData, resetUserData } = useUserStore();
  const { accessToken, resetTokens } = useTokensStore();

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

    if (!res || !res.data) throw new Error('Failed to fetch user data');

    const { __typename, ...currUser } = res.data.currentUser;

    setUserData(currUser);
  }, []);

  const onSignout = useCallback(() => {
    resetTokens();
    resetUserData();

    return navigate(ROOT_ROUTE);
  }, []);

  useEffect(() => {
    getUserData().catch(console.error);
  }, []);

  return [userData, onSignout] as const;
}
