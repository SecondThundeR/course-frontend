import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { CHAT_ROUTE } from '@/constants/routes';

const ESCAPE_KEY = 'Escape';

type UseChatKeyCloseOptions = {
  keyName?: string;
  disableDefaultAction?: boolean;
  customAction?: () => void;
};

export function useChatKeyClose(options?: UseChatKeyCloseOptions) {
  const navigate = useNavigate();

  const { keyName = ESCAPE_KEY, disableDefaultAction = false, customAction } = { ...options };

  const keyDownHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === keyName) {
        event.preventDefault();
        if (disableDefaultAction) {
          customAction?.();
        } else {
          customAction ? customAction() : navigate(CHAT_ROUTE);
        }
      }
    },
    [keyName, disableDefaultAction, customAction, navigate]
  );

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);

    return () => document.removeEventListener('keydown', keyDownHandler);
  }, [keyDownHandler]);
}
