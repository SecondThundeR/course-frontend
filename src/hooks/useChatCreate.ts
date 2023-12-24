import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { CREATE_CONVERSATION } from '@/constants/mutation';
import { CHAT_ROUTE } from '@/constants/routes';

import { useConversationsStore, useTokensStore } from '@/store';

type OnCreateArgs = {
  email: string;
  message: string;
  isLatex: boolean;
  onClose: () => void;
};

export default function useChatCreate() {
  const accessToken = useTokensStore((state) => state.accessToken);
  const addConversation = useConversationsStore((state) => state.addConversation);
  const [createChat, { loading, error }] = useMutation(CREATE_CONVERSATION);
  const navigate = useNavigate();

  const onCreate = useCallback(
    async (options: OnCreateArgs) => {
      const { message, email, isLatex, onClose } = options;

      const res = await createChat({
        variables: {
          data: {
            participantsEmails: [email],
            initialMessage: message,
            isLatex,
          },
        },
        context: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      });

      if (!res.data) return;
      const { createConversation } = res.data;

      addConversation(createConversation);
      onClose();
      navigate(`${CHAT_ROUTE}/${createConversation.id}`);
    },
    [accessToken, addConversation, createChat, navigate]
  );

  return { loading, error, onCreate };
}
