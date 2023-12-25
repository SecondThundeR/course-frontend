import { useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';

import { DELETE_MESSAGE } from '@/constants/graphql/mutation';

import { useConversationsStore, useTokensStore } from '@/store';

import useModal from './useModal';

export default function useMessageModalDelete(id: string) {
  const [localError, setLocalError] = useState<Error>();
  const { modalOpened, onClose: close, onOpen } = useModal();
  const [deleteMsg, { loading, error }] = useMutation(DELETE_MESSAGE);
  const accessToken = useTokensStore((state) => state.accessToken);
  const removeMessage = useConversationsStore((state) => state.removeMessage);

  const onClose = useCallback(() => {
    if (!loading) close();
  }, [close, loading]);

  const onDelete = useCallback(async () => {
    const res = await deleteMsg({
      variables: {
        messageId: id,
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
  }, [accessToken, deleteMsg, id, close, removeMessage]);

  return {
    modalOpened,
    loading,
    error: error ?? localError,
    handlers: { onOpen, onClose, onDelete },
  };
}
