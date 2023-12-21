import { useCallback, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import { CONVERSATIONS_DATA } from '@/constants/queries';

import { useConversationsStore, useTokensStore, useUserStore } from '@/store';

export default function useConversationsWatcher() {
  const { userData } = useUserStore();
  const { accessToken } = useTokensStore();
  const { setConversations, addConversation, removeConversation, resetConversations } =
    useConversationsStore();
  const [getUser] = useLazyQuery(CONVERSATIONS_DATA);

  const fetchConversations = useCallback(async (userId: string) => {
    const res = await getUser({
      variables: {
        userId,
      },
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    });

    if (!res || !res.data) throw new Error('Failed to fetch conversations data');

    // @ts-expect-error I hate this GraphQL codegen
    setConversations(res.data.userConversations);
  }, []);

  const userId = userData?.id;

  useEffect(() => {
    if (!userId) return;
    fetchConversations(userId);

    return () => resetConversations();
  }, [userId]);
}
