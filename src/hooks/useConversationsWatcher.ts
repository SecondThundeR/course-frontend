import { useCallback, useEffect } from 'react';
import { useLazyQuery, useSubscription } from '@apollo/client';

import {
  UpdateType,
  type ConversationUpdatesSubscription,
  type MessageUpdatesSubscription,
} from '@/__generated__/graphql';

import { CONVERSATIONS_DATA } from '@/constants/graphql/queries';
import { CONVERSATION_UPDATES, MESSAGE_UPDATES } from '@/constants/graphql/subscriptions';

import { useConversationsStore, useTokensStore, useUserStore } from '@/store';

export function useConversationsWatcher() {
  const accessToken = useTokensStore.use.accessToken();
  const {
    setConversations,
    addConversation,
    removeConversation,
    addMessage,
    editMessage,
    removeMessage,
    resetConversations,
  } = useConversationsStore();
  const userData = useUserStore.use.userData();
  const userId = userData?.id ?? '';
  const [getConversations] = useLazyQuery(CONVERSATIONS_DATA);
  const { data: conversationUpdate } = useSubscription(CONVERSATION_UPDATES, {
    variables: {
      userId,
    },
  });
  const { data: messageUpdate } = useSubscription(MESSAGE_UPDATES, {
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

      if (!res?.data) throw new Error('Не удалось получить данные о чате');

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
        case UpdateType.Edited:
          // * Currently, there are no edit conversation event,
          // * so we are skipping this
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
        case UpdateType.Edited:
          editMessage(message);
          break;
        case UpdateType.Deleted:
          removeMessage(message);
          break;
      }
    },
    [addMessage, editMessage, removeMessage]
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
    if (messageUpdate === undefined) return;
    processMessageUpdate(messageUpdate);
  }, [messageUpdate, processMessageUpdate]);
}
