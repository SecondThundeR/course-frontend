import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { DELETE_CONVERSATION } from '@/constants/graphql/mutation';

import { useConversationsStore, useTokensStore } from '@/store';

export function useChatDelete(conversationId: string, onDeleteCallback?: () => void) {
  const accessToken = useTokensStore.use.accessToken();
  const removeConversation = useConversationsStore.use.removeConversation();
  const [deleteChat, { error, loading }] = useMutation(DELETE_CONVERSATION, {
    variables: {
      data: {
        conversationId,
      },
    },
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });

  const onDelete = useCallback(async () => {
    const res = await deleteChat();
    if (res.errors) return;

    removeConversation(conversationId);
    onDeleteCallback?.();
  }, [conversationId, deleteChat, onDeleteCallback, removeConversation]);

  return {
    onDelete,
    error,
    loading,
  };
}
