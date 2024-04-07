import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';

import { LOGIN_ROUTE, ROOT_ROUTE } from '@/constants/routes';
import { CURRENT_USER } from '@/constants/graphql/queries';
import { SESSION_EXPIRED } from '@/constants/statuses';

import { useConversationsStore, useTokensStore, useUserStore } from '@/store';

export default function useCurrentUser() {
  const { userData, setUserData, resetUserData } = useUserStore();
  const { accessToken, resetTokens } = useTokensStore((state) => ({
    accessToken: state.accessToken,
    resetTokens: state.resetTokens,
  }));
  const resetConversations = useConversationsStore((state) => state.resetConversations);
  const [getUser] = useLazyQuery(CURRENT_USER, {
    errorPolicy: 'all',
  });
  const navigate = useNavigate();

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
      return navigate(`${LOGIN_ROUTE}?status=${SESSION_EXPIRED}`);
    }

    if (!res?.data) {
      throw new Error('Не удалось получить данные о пользователе');
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
