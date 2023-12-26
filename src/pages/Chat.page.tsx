import { Suspense, lazy, memo } from 'react';

import { useConversationsWatcher, useAuthorizedRedirect } from '@/hooks';

const LazyChatShell = lazy(() => import('../components/Chat/Shell'));

const Chat = memo(() => {
  useAuthorizedRedirect();
  useConversationsWatcher();

  return (
    <Suspense>
      <LazyChatShell />
    </Suspense>
  );
});

export default Chat;
