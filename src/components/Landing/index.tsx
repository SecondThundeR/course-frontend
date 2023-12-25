import 'katex/dist/katex.min.css';

import { memo } from 'react';

import { LandingFAQ } from './FAQ';
import { LandingFeatures } from './Features';
import { LandingHero } from './Hero';
import { LandingKatex } from './Katex';

const LandingBase = memo(function LandingBase() {
  throw new Error("Doesn't use this `Landing` component. Export other components via dot notation");
});

export const Landing = Object.assign(LandingBase, {
  FAQ: LandingFAQ,
  Features: LandingFeatures,
  Hero: LandingHero,
  Katex: LandingKatex,
});
