import { useCallback, useEffect } from 'react';
import { useLazyQuery, useSubscription } from '@apollo/client';

import { CONVERSATIONS_DATA } from '@/constants/queries';
import { CONVERSATION_UPDATES, MESSAGE_UPDATES } from '@/constants/subscriptions';

import { useConversationsStore, useTokensStore, useUserStore } from '@/store';

import {
  UpdateType,
  type ConversationUpdatesSubscription,
  type MessageUpdatesSubscription,
} from '@/__generated__/graphql';

export default function useConversationsWatcher() {
  const { userData } = useUserStore();
  const userId = userData?.id ?? '';
  const { accessToken } = useTokensStore();
  const {
    setConversations,
    addConversation,
    removeConversation,
    addMessage,
    removeMessage,
    resetConversations,
  } = useConversationsStore();
  const [getConversations] = useLazyQuery(CONVERSATIONS_DATA);
  const { data: conversationUpdate } = useSubscription(CONVERSATION_UPDATES, {
    variables: {
      userId,
    },
  });
  const { data: messsageUpdate } = useSubscription(MESSAGE_UPDATES, {
    variables: {
      userId,
    },
  });

  const fetchConversations = useCallback(
    async (userId: string) => {
      const res = await getConversations({
        variables: {
          userId,
        },
        context: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      });

      if (!res?.data) throw new Error('Failed to fetch conversations data');

      setConversations(res.data.userConversations);
    },
    [accessToken, getConversations, setConversations]
  );

  const processConversationUpdate = useCallback(
    (update: ConversationUpdatesSubscription) => {
      const { type, conversation } = update.conversationUpdates;

      switch (type) {
        case UpdateType.Added:
          addConversation(conversation);
          break;
        case UpdateType.Deleted:
          removeConversation(conversation.id);
          break;
      }
    },
    [addConversation, removeConversation]
  );

  const processMessageUpdate = useCallback(
    (update: MessageUpdatesSubscription) => {
      const { type, message } = update.messageUpdates;

      switch (type) {
        case UpdateType.Added:
          addMessage(message);
          break;
        case UpdateType.Deleted:
          removeMessage(message);
          break;
      }
    },
    [addMessage, removeMessage]
  );

  useEffect(() => {
    if (!userId) return;
    fetchConversations(userId).catch(console.error);

    return () => resetConversations();
  }, [fetchConversations, resetConversations, userId]);

  useEffect(() => {
    if (conversationUpdate === undefined) return;
    processConversationUpdate(conversationUpdate);
  }, [conversationUpdate, processConversationUpdate]);

  useEffect(() => {
    if (messsageUpdate === undefined) return;
    processMessageUpdate(messsageUpdate);
  }, [messsageUpdate, processMessageUpdate]);
}
