import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { CHAT_ROUTE } from '@/constants/routes';

export default function useChatClose() {
  const navigate = useNavigate();

  const closeChat = useCallback(() => {
    navigate(CHAT_ROUTE);
  }, [navigate]);

  const keyDownHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeChat();
      }
    },
    [closeChat]
  );

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [keyDownHandler]);
}
