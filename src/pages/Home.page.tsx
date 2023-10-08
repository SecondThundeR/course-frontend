import { memo } from 'react';

import { LandingHero } from '@/components/LandingHero/LandingHero';
import { LandingFeatures } from '@/components/LandingFeatures/LandingFeatures';
import { LandingKatex } from '@/components/LandingKatex/LandingKatex';
import { LandingFAQ } from '@/components/LandingFAQ/LandingFAQ';
import useChatRedirect from '@/hooks/useChatRedirect';

const Home = memo(() => {
  useChatRedirect();

  return (
    <>
      <LandingHero />
      <LandingFeatures />
      <LandingKatex />
      <LandingFAQ />
    </>
  );
});

export default Home;
