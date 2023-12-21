import { memo } from 'react';

import { ChatBlocks } from '@/components';

import { useConversationsWatcher, useCurrentUser, useUserStoreRedirect } from '@/hooks';

const Chat = memo(function Chat() {
  const [data, onSignout] = useCurrentUser();

  useUserStoreRedirect();
  useConversationsWatcher();

  return <ChatBlocks.Shell user={data} onSignout={onSignout} />;
});

export default Chat;
