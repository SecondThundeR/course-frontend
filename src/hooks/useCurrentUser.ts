import { useCallback, useEffect } from 'react';
import { createPath, createSearchParams, useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';

import { CURRENT_USER } from '@/constants/graphql/queries';
import { LOGIN_ROUTE, ROOT_ROUTE } from '@/constants/routes';
import { PAGE_STATUS } from '@/constants/pageStatus';

import { currentUserTokenSelector } from '@/store/selectors';
import { useConversationsStore, useTokensStore, useUserStore } from '@/store';

export function useCurrentUser() {
  const { userData, setUserData, resetUserData } = useUserStore();
  const { accessToken, resetTokens } = useTokensStore(currentUserTokenSelector);
  const resetConversations = useConversationsStore.use.resetConversations();
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
      return navigate(
        createPath({
          pathname: LOGIN_ROUTE,
          search: `?${createSearchParams({
            status: PAGE_STATUS.sessionExpired,
          })}`,
        })
      );
    }

    if (!res?.data) {
      throw new Error('Не удалось получить данные о пользователе');
    }

    setUserData(res.data.currentUser);
  }, [accessToken, getUser, navigate, resetData, setUserData]);

  const onSignout = useCallback(() => {
    resetData();
    navigate(ROOT_ROUTE);
  }, [navigate, resetData]);

  useEffect(() => {
    getUserData().catch(console.error);
  }, [getUserData]);

  return { userData, onSignout };
}
