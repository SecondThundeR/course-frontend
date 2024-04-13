import { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { EDIT_MESSAGE } from '@/constants/graphql/mutation';

import { type ConversationInfo, useConversationsStore, useTokensStore } from '@/store';

type Message = ConversationInfo['messages'][number];

export function useMessageEdit(conversationId?: string) {
  const [messageEdit, setMessageEdit] = useState<Message>();
  const accessToken = useTokensStore.use.accessToken();
  const conversations = useConversationsStore.use.conversations();
  const editMessage = useConversationsStore.use.editMessage();
  const [editMsg, { loading }] = useMutation(EDIT_MESSAGE);

  const onEditSend = useCallback(
    async (message: string) => {
      if (!messageEdit || !conversationId)
        throw new Error('Нельзя отправить изменение для пустого сообщения');

      const res = await editMsg({
        variables: {
          data: {
            messageId: messageEdit.id,
            content: message,
            conversationId,
          },
        },
        context: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      });

      if (!res.data) throw new Error('Не удалось изменить сообщение');

      editMessage(res.data.editMessage);
    },
    [accessToken, conversationId, editMessage, editMsg, messageEdit]
  );

  const onEditMessageChange = useCallback(
    (messageId?: string) => {
      if (!conversationId || !messageId) return;

      const message = conversations
        .find((c) => c.id === conversationId)
        ?.messages.find((m) => m.id === messageId);
      if (!message) {
        console.warn('Не удалось найти сообщение в указанном чате');
        return;
      }

      setMessageEdit(message);

      return message;
    },
    [conversationId, conversations]
  );

  const onEditMessageRemove = useCallback(() => {
    if (!conversationId || !messageEdit) return;
    setMessageEdit(undefined);
  }, [conversationId, messageEdit]);

  return {
    messageEdit,
    loading,
    onEditSend,
    onEditMessageChange,
    onEditMessageRemove,
  };
}
