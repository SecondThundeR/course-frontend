import { useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { CREATE_CONVERSATION } from '@/constants/graphql/mutation';
import { CHAT_ROUTE } from '@/constants/routes';

import { chatCreateSelector } from '@/store/selectors';
import { useConversationsStore, useTokensStore } from '@/store';

type OnCreateArgs = {
  email: string;
  message: string;
  isLatex: boolean;
  onClose: () => void;
};

export function useChatCreate() {
  const accessToken = useTokensStore.use.accessToken();
  const { conversations, addConversation } = useConversationsStore(chatCreateSelector);
  const [createChat, { loading, error: mutationError }] = useMutation(CREATE_CONVERSATION);
  const [error, setError] = useState<Error>();
  const navigate = useNavigate();

  const onCreate = useCallback(
    async ({ message, email, isLatex, onClose }: OnCreateArgs) => {
      setError(undefined);

      const isChatExistsAlready = conversations.some(({ participants }) =>
        participants.some((p) => p.email === email)
      );

      if (isChatExistsAlready) {
        setError(new Error(`Чат с "${email}" уже существует`));
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

  return { loading, error: mutationError ?? error, onCreate };
}
