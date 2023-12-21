import { memo } from 'react';

import { Landing } from '@/components';

import { useUserStoreRedirect } from '@/hooks';

const Home = memo(() => {
  useUserStoreRedirect(false);

  return (
    <>
      <Landing.Hero />
      <Landing.Features />
      <Landing.Katex />
      <Landing.FAQ />
    </>
  );
});

export default Home;
