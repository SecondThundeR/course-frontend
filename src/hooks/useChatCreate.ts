import { useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { CREATE_CONVERSATION } from '@/constants/graphql/mutation';
import { CHAT_ROUTE } from '@/constants/routes';

import { useConversationsStore, useTokensStore } from '@/store';
import { chatCreateSelector } from '@/store/selectors';

type OnCreateArgs = {
  email: string;
  message: string;
  isLatex: boolean;
  onClose: () => void;
};

export default function useChatCreate() {
  const accessToken = useTokensStore.use.accessToken();
  const { conversations, addConversation } = useConversationsStore(chatCreateSelector);
  const [createChat, { loading, error }] = useMutation(CREATE_CONVERSATION);
  const [localError, setLocalError] = useState<Error>();
  const navigate = useNavigate();

  const onCreate = useCallback(
    async ({ message, email, isLatex, onClose }: OnCreateArgs) => {
      setLocalError(undefined);

      const isChatExistsAlready = conversations.some((conversation) =>
        conversation.participants.some((user) => user.email === email)
      );

      if (isChatExistsAlready) {
        setLocalError(new Error(`Чат с "${email}" уже существует`));
        return;
      }

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
    [accessToken, addConversation, conversations, createChat, navigate]
  );

  return { loading, error: error ?? localError, onCreate };
}
