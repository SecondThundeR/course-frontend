import { Suspense, lazy, memo } from 'react';
import { useParams } from 'react-router-dom';

import { useChatClose } from '@/hooks';

const LazyChatConversation = lazy(() => import('../components/Chat/Conversation'));

const ChatConversation = memo(() => {
  const { chatId } = useParams();

  useChatClose();

  return (
    <Suspense>
      <LazyChatConversation chatId={chatId} />
    </Suspense>
  );
});

export default ChatConversation;
