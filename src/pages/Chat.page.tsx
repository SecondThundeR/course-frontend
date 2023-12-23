import { memo } from 'react';

import { ChatBlocks } from '@/components';

import { useConversationsWatcher, useUserStoreRedirect } from '@/hooks';

const Chat = memo(() => {
  useUserStoreRedirect();
  useConversationsWatcher();

  return <ChatBlocks.Shell />;
});

export default Chat;
