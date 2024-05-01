import { memo } from 'react';

import { AuthorizedRedirectLayout, AnonymousChatShell } from '@/components';

export const Component = memo(() => {
  return (
    <AuthorizedRedirectLayout isCheckForLoggedIn={false}>
      <AnonymousChatShell />
    </AuthorizedRedirectLayout>
  );
});

Component.displayName = 'AnonymousChat';
