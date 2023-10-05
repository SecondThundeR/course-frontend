import { memo } from 'react';

import { LandingHero } from '@/components/LandingHero/LandingHero';
import { LandingFeatures } from '@/components/LandingFeatures/LandingFeatures';
import { LandingKatex } from '@/components/LandingKatex/LandingKatex';
import { LandingFAQ } from '@/components/LandingFAQ/LandingFAQ';

const HomePage = memo(() => (
  <>
    <LandingHero />
    <LandingFeatures />
    <LandingKatex />
    <LandingFAQ />
  </>
));

export default HomePage;
