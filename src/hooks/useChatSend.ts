import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_MESSAGE } from '@/constants/graphql/mutation';
import { useConversationsStore, useTokensStore } from '@/store';
import { MessageType } from '@/__generated__/graphql';

export default function useChatSend(conversationId?: string, onSendCallback?: () => void) {
  const accessToken = useTokensStore((state) => state.accessToken);
  const addMessage = useConversationsStore((state) => state.addMessage);
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
      onSendCallback?.();
    },
    [accessToken, addMessage, conversationId, createMsg, onSendCallback]
  );

  return { onSend, loading };
}
