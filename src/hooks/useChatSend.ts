import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { MessageType } from '@/__generated__/graphql';

import { CREATE_MESSAGE } from '@/constants/graphql/mutation';

import { useConversationsStore, useTokensStore } from '@/store';

export default function useChatSend(conversationId?: string) {
  const accessToken = useTokensStore.use.accessToken();
  const addMessage = useConversationsStore.use.addMessage();
  const [createMsg, { loading }] = useMutation(CREATE_MESSAGE);

  const onSend = useCallback(
    async (message: string, isLatex: boolean) => {
      if (!conversationId)
        throw new Error('Нельзя отправить сообщение с пустым идентификатором чата');

      const res = await createMsg({
        variables: {
          data: {
            conversationId,
            content: message,
            type: isLatex ? MessageType.Latex : MessageType.Regular,
          },
        },
        context: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      });

      if (!res.data) throw new Error('Не удалось отправить сообщение');

      addMessage(res.data.createMessage);
    },
    [accessToken, addMessage, conversationId, createMsg]
  );

  return { onSend, loading };
}
