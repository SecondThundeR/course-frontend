import { memo } from 'react';

import { ChatBlocks } from '@/components';

import { useChatClose } from '@/hooks';

const ChatConversation = memo(() => {
  useChatClose();

  return <ChatBlocks.Conversation />;
});

export default ChatConversation;
