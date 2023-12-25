import { memo, lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const LazyRootShell = lazy(() => import('../components/RootShell'));

const Root = memo(() => (
  <Suspense>
    <LazyRootShell>
      <Outlet />
    </LazyRootShell>
  </Suspense>
));

export default Root;
