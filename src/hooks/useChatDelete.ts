import { DELETE_CONVERSATION } from '@/constants/graphql/mutation';
import { useConversationsStore, useTokensStore } from '@/store';
import { useMutation } from '@apollo/client';
import { useCallback } from 'react';

export default function useChatDelete(conversationId: string, onDeleteCallback?: () => void) {
  const accessToken = useTokensStore((state) => state.accessToken);
  const removeConversation = useConversationsStore((state) => state.removeConversation);
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
