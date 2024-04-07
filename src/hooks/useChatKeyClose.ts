import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { CHAT_ROUTE } from '@/constants/routes';

const ESCAPE_KEY = 'Escape';

export function useChatKeyClose(keyName = ESCAPE_KEY) {
  const navigate = useNavigate();

  const keyDownHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === keyName) {
        event.preventDefault();
        navigate(CHAT_ROUTE);
      }
    },
    [navigate, keyName]
  );

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);

    return () => document.removeEventListener('keydown', keyDownHandler);
  }, [keyDownHandler]);
}
