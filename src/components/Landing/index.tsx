import 'katex/dist/katex.min.css';

import { memo } from 'react';

import { LandingFAQ } from './FAQ';
import { LandingFeatures } from './Features';
import { LandingHero } from './Hero';
import { LandingKatex } from './Katex';

const LandingBase = memo(function LandingBase() {
  throw new Error(
    'Не используйте этот компонент. Вместо этого, используйте другие, используя нотацию через точку'
  );
});

export const Landing = Object.assign(LandingBase, {
  FAQ: LandingFAQ,
  Features: LandingFeatures,
  Hero: LandingHero,
  Katex: LandingKatex,
});
