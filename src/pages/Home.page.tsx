import { memo } from 'react';

import {
  AuthorizedRedirectLayout,
  LandingFAQ,
  LandingFeatures,
  LandingHero,
  LandingKatex,
} from '@/components';

export const Component = memo(() => (
  <AuthorizedRedirectLayout isCheckForLoggedIn={false}>
    <LandingHero />
    <LandingFeatures />
    <LandingKatex />
    <LandingFAQ />
  </AuthorizedRedirectLayout>
));

Component.displayName = 'Home';
