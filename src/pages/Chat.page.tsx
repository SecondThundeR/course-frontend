import { memo } from 'react';

import { ChatBlocks } from '@/components';

import { useCurrentUser, useUserStoreRedirect } from '@/hooks';

const Chat = memo(function Chat() {
  const [data, onSignout] = useCurrentUser();

  useUserStoreRedirect();

  return <ChatBlocks.Shell user={data} onSignout={onSignout} />;
});

export default Chat;
