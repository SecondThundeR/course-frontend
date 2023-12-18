import { memo } from 'react';

import { ChatBlocks } from '@/components';

const ChatIndex = memo(function ChatIndex() {
  return <ChatBlocks.Placeholder />;
});

export default ChatIndex;
