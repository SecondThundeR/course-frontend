import { useCallback, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useSessionStorage } from '@mantine/hooks';

import { ANONYMOUS_CHAT_USERNAME } from '@/constants/graphql/queries';

export function useAnonymousChatUsername() {
  const [getNewUsername] = useLazyQuery<{ assignRandomUsername: string }>(ANONYMOUS_CHAT_USERNAME);
  const [isFailedToGetUsername, setIsFailedToGetUsername] = useState(false);

  const [username, setUsername, removeUsername] = useSessionStorage<string | undefined>({
    key: 'anon-username',
    getInitialValueInEffect: false,
  });

  const clearAssignedUsername = useCallback(() => {
    removeUsername();
  }, [removeUsername]);

  const getUsernameFromServer = useCallback(async () => {
    setIsFailedToGetUsername(false);

    const data = await getNewUsername();
    if (data.data) return data.data.assignRandomUsername;

    setIsFailedToGetUsername(true);
  }, [getNewUsername]);

  useEffect(() => {
    if (isFailedToGetUsername) return;

    if (!username) {
      getUsernameFromServer().then(setUsername).catch(console.error);
    }
  }, [getUsernameFromServer, isFailedToGetUsername, setUsername, username]);

  return { username, isFailedToGetUsername, clearAssignedUsername };
}
