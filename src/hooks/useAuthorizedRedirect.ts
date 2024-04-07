import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { CHAT_ROUTE, LOGIN_ROUTE } from '@/constants/routes';
import { NOT_LOGGED_IN } from '@/constants/statuses';

import { useTokensStore } from '@/store';

export default function useAuthorizedRedirect(isCheckForLoggedIn = true) {
  const accessToken = useTokensStore.use.accessToken();
  const navigate = useNavigate();

  useEffect(() => {
    const isUserLoggedIn = accessToken !== null;

    if (!isUserLoggedIn && isCheckForLoggedIn) {
      navigate(`${LOGIN_ROUTE}?status=${NOT_LOGGED_IN}`);
    } else if (isUserLoggedIn && !isCheckForLoggedIn) {
      navigate(CHAT_ROUTE);
    }
  }, [accessToken, isCheckForLoggedIn, navigate]);
}
