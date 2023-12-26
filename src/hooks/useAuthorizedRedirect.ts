import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { CHAT_ROUTE, LOGIN_ROUTE } from '@/constants/routes';

import { useTokensStore } from '@/store';

export default function useAuthorizedRedirect(isCheckForLoggedIn = true) {
  const accessToken = useTokensStore((state) => state.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    const isUserLoggedIn = accessToken !== null;

    if (!isUserLoggedIn && isCheckForLoggedIn) {
      navigate(`${LOGIN_ROUTE}?status=not-logged-in`);
    } else if (isUserLoggedIn && !isCheckForLoggedIn) {
      navigate(CHAT_ROUTE);
    }
  }, [isCheckForLoggedIn, navigate, accessToken]);
}
