import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@mantine/hooks';
import { CHAT_ROUTE } from '@/constants/routes';

function useChatRedirect() {
  const navigate = useNavigate();
  const [accessToken] = useLocalStorage({
    key: 'accessToken',
  });

  useEffect(() => {
    if (!accessToken) return;
    navigate(CHAT_ROUTE);
  }, []);
}

export default useChatRedirect;
