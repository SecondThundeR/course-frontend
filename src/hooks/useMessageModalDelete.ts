import { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';

import { DELETE_MESSAGE } from '@/constants/graphql/mutation';

import { useConversationsStore, useTokensStore } from '@/store';

import useModal from './useModal';

export default function useMessageModalDelete() {
  const [selectedMessageId, setSelectedMessageId] = useState<string>();
  const [localError, setLocalError] = useState<Error>();
  const { modalOpened, onClose: close, onOpen: open } = useModal();
  const [deleteMsg, { loading, error }] = useMutation(DELETE_MESSAGE);
  const accessToken = useTokensStore((state) => state.accessToken);
  const removeMessage = useConversationsStore((state) => state.removeMessage);

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
    setLocalError(undefined);
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
      setLocalError(new Error('Не удалось удалить сообщение!'));
      return;
    }

    removeMessage(res.data.deleteMessage);
    close();
  }, [selectedMessageId, deleteMsg, accessToken, removeMessage, close]);

  useEffect(() => {
    if (!modalOpened) {
      setSelectedMessageId(undefined);
      setLocalError(undefined);
    }
  }, [modalOpened]);

  return {
    modalOpened,
    loading,
    error: error ?? localError,
    handlers: { onOpen, onClose, onDelete },
  };
}
