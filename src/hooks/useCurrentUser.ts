import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';

import { LOGIN_ROUTE, ROOT_ROUTE } from '@/constants/routes';
import { CURRENT_USER } from '@/constants/graphql/queries';

import { useConversationsStore, useTokensStore, useUserStore } from '@/store';

export default function useCurrentUser() {
  const navigate = useNavigate();
  const [getUser] = useLazyQuery(CURRENT_USER);
  const { userData, setUserData, resetUserData } = useUserStore();
  const { accessToken, resetTokens } = useTokensStore((state) => ({
    accessToken: state.accessToken,
    resetTokens: state.resetTokens,
  }));
  const resetConversations = useConversationsStore((state) => state.resetConversations);

  const resetData = useCallback(() => {
    resetUserData();
    resetTokens();
    resetConversations();
  }, [resetConversations, resetTokens, resetUserData]);

  const getUserData = useCallback(async () => {
    if (!accessToken) {
      return navigate(ROOT_ROUTE);
    }

    const res = await getUser({
      context: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });

    if (res?.error?.message === 'Unauthorized') {
      resetData();
      return navigate(`${LOGIN_ROUTE}?status=session-expired`);
    }

    if (!res?.data) {
      throw new Error('Failed to fetch user data');
    }

    setUserData(res.data.currentUser);
  }, [accessToken, getUser, navigate, resetData, setUserData]);

  const onSignout = useCallback(() => {
    resetData();
    return navigate(ROOT_ROUTE);
  }, [navigate, resetData]);

  useEffect(() => {
    getUserData().catch(console.error);
  }, [getUserData]);

  return { userData, onSignout };
}
