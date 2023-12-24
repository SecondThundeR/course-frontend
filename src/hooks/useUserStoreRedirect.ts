import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { CHAT_ROUTE, LOGIN_ROUTE } from '@/constants/routes';

import { useUserStore } from '@/store';

export default function useUserStoreRedirect(isCheckForLoggedIn = true) {
  const navigate = useNavigate();
  const userData = useUserStore((state) => state.userData);

  useEffect(() => {
    const isUserExists = userData !== null;

    if (!isUserExists && isCheckForLoggedIn) {
      navigate(`${LOGIN_ROUTE}?status=not-logged-in`);
    } else if (isUserExists && !isCheckForLoggedIn) {
      navigate(CHAT_ROUTE);
    }
  }, [isCheckForLoggedIn, navigate, userData]);
}
