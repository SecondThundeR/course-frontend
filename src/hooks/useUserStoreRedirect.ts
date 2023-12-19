import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { CHAT_ROUTE, ROOT_ROUTE } from '@/constants/routes';

import { useUserStore } from '@/store';

export default function useUserStoreRedirect(isCheckForLoggedIn = true) {
  const navigate = useNavigate();
  const { userData } = useUserStore();

  useEffect(() => {
    const isUserExists = userData !== null;

    if (!isUserExists && isCheckForLoggedIn) {
      return void navigate(ROOT_ROUTE);
    }

    if (isUserExists && !isCheckForLoggedIn) {
      return void navigate(CHAT_ROUTE);
    }
  }, [userData]);
}
