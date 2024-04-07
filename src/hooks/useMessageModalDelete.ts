import { useCallback, useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useMutation } from '@apollo/client';

import { DELETE_MESSAGE } from '@/constants/graphql/mutation';

import { useConversationsStore, useTokensStore } from '@/store';

export function useMessageModalDelete() {
  const [selectedMessageId, setSelectedMessageId] = useState<string>();
  const [error, setError] = useState<Error>();
  const [opened, { open, close }] = useDisclosure();
  const [deleteMsg, { loading, error: mutationError }] = useMutation(DELETE_MESSAGE);
  const accessToken = useTokensStore.use.accessToken();
  const removeMessage = useConversationsStore.use.removeMessage();

  const onOpen = useCallback(
    (messageId: string) => {
      setSelectedMessageId(messageId);
      open();
    },
    [open]
  );

  const onClose = useCallback(() => {
    if (loading) return;

    close();
    setSelectedMessageId(undefined);
    setError(undefined);
  }, [close, loading]);

  const onDelete = useCallback(async () => {
    if (!selectedMessageId) return;

    const res = await deleteMsg({
      variables: {
        messageId: selectedMessageId,
      },
      context: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });

    if (!res.data) {
      setError(new Error('Не удалось удалить сообщение!'));
      return;
    }

    removeMessage(res.data.deleteMessage);
    close();
  }, [selectedMessageId, deleteMsg, accessToken, removeMessage, close]);

  useEffect(() => {
    if (opened) return;

    setSelectedMessageId(undefined);
    setError(undefined);
  }, [opened]);

  return {
    opened,
    loading,
    error: mutationError ?? error,
    handlers: { onOpen, onClose, onDelete },
  };
}
