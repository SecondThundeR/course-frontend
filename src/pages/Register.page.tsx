import { memo } from 'react';

import { AuthorizedRedirectLayout, RegisterPage } from '@/components';

export const Component = memo(() => (
  <AuthorizedRedirectLayout isCheckForLoggedIn={false}>
    <RegisterPage />
  </AuthorizedRedirectLayout>
));

Component.displayName = 'Register';
