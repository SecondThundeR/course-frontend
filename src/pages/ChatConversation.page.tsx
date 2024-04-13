import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { ChatConversation } from '@/components';

export const Component = memo(() => {
  const { chatId } = useParams();

  return <ChatConversation chatId={chatId} />;
});

Component.displayName = 'ChatConversation';
