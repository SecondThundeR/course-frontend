import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { MessageType } from '@/__generated__/graphql';

import { CREATE_ANONYMOUS_MESSAGE } from '@/constants/graphql/mutation';

export function useAnonymousChatSend(username?: string) {
  const [createMsg, { loading }] = useMutation(CREATE_ANONYMOUS_MESSAGE);

  const onSend = useCallback(
    async (message: string, isLatex: boolean) => {
      if (!username) throw new Error('Нельзя отправить сообщение с пустым именем собеседника');

      const res = await createMsg({
        variables: {
          data: {
            fromId: username,
            content: message,
            type: isLatex ? MessageType.Latex : MessageType.Regular,
          },
        },
      });

      if (!res.data) throw new Error('Не удалось отправить сообщение');
    },
    [createMsg, username]
  );

  return { onSend, loading };
}
