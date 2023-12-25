import { Suspense, lazy, memo } from 'react';

import { useConversationsWatcher, useUserStoreRedirect } from '@/hooks';

const LazyChatShell = lazy(() => import('../components/Chat/Shell'));

const Chat = memo(() => {
  useUserStoreRedirect();
  useConversationsWatcher();

  return (
    <Suspense>
      <LazyChatShell />;
    </Suspense>
  );
});

export default Chat;
