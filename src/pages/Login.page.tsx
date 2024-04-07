import { memo } from 'react';

import { AuthorizedRedirectLayout, LoginPage } from '@/components';

export const Component = memo(() => (
  <AuthorizedRedirectLayout isCheckForLoggedIn={false}>
    <LoginPage />
  </AuthorizedRedirectLayout>
));

Component.displayName = 'Login';
