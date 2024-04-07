import { memo, lazy, Suspense } from 'react';

import { useAuthorizedRedirect } from '@/hooks';

const LazyLandingHero = lazy(() => import('../components/Landing/Hero'));
const LazyLandingFeatures = lazy(() => import('../components/Landing/Features'));
const LazyLandingKatex = lazy(() => import('../components/Landing/Katex'));
const LazyLandingFAQ = lazy(() => import('../components/Landing/FAQ'));

const CHECK_FOR_LOGGED_IN = false;

const Home = memo(() => {
  useAuthorizedRedirect(CHECK_FOR_LOGGED_IN);

  return (
    <Suspense>
      <LazyLandingHero />
      <LazyLandingFeatures />
      <LazyLandingKatex />
      <LazyLandingFAQ />
    </Suspense>
  );
});

export default Home;
