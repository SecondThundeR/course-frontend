import { memo } from 'react';

import { AuthorizedRedirectLayout, ChatShell } from '@/components';

import { useConversationsWatcher } from '@/hooks';

export const Component = memo(() => {
  useConversationsWatcher();

  return (
    <AuthorizedRedirectLayout>
      <ChatShell />
    </AuthorizedRedirectLayout>
  );
});

Component.displayName = 'Chat';
