import { Suspense, lazy, memo } from 'react';

const LazyLoginPage = lazy(() => import('../components/LoginPage'));

const Login = memo(() => (
  <Suspense>
    <LazyLoginPage />
  </Suspense>
));

export default Login;
