import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { ChatConversation } from '@/components';

import { useChatKeyClose } from '@/hooks';

export const Component = memo(() => {
  const { chatId } = useParams();

  useChatKeyClose();

  return <ChatConversation chatId={chatId} />;
});

Component.displayName = 'ChatConversation';
