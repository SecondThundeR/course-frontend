import { memo, lazy, Suspense } from 'react';

const LazyBlock404 = lazy(() => import('../components/Block404'));

const NotFound = memo(() => (
  <Suspense>
    <LazyBlock404 />
  </Suspense>
));

export default NotFound;
