import { useCallback, useEffect } from 'react';
import { useLazyQuery, useSubscription } from '@apollo/client';

import { CONVERSATIONS_DATA } from '@/constants/queries';

import { useConversationsStore, useTokensStore, useUserStore } from '@/store';
import { CONVERSATION_UPDATES, MESSAGE_UPDATES } from '@/constants/subscriptions';
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
  const [getUser] = useLazyQuery(CONVERSATIONS_DATA);
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

      if (!res?.data) throw new Error('Failed to fetch conversations data');

      setConversations(res.data.userConversations);
    },
    [accessToken, getUser, setConversations]
  );

  const processConversationUpdate = useCallback(
    (update: ConversationUpdatesSubscription, userId: string) => {
      const { type, conversation } = update.conversationUpdates;

      if (conversation.participants.findIndex((data) => data.id === userId) === -1) return;

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
    (update: MessageUpdatesSubscription, userId: string) => {
      const { type, message } = update.messageUpdates;

      if (message.from?.id === userId) return;

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
    if (conversationUpdate === undefined || !userId) return;
    processConversationUpdate(conversationUpdate, userId);
  }, [conversationUpdate, processConversationUpdate, userId]);

  useEffect(() => {
    if (messsageUpdate === undefined || !userId) return;
    processMessageUpdate(messsageUpdate, userId);
  }, [messsageUpdate, processMessageUpdate, userId]);
}
