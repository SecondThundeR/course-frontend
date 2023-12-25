import { memo, lazy, Suspense } from 'react';

const LazyRegisterPage = lazy(() => import('../components/RegisterPage'));

const Register = memo(() => (
  <Suspense>
    <LazyRegisterPage />
  </Suspense>
));

export default Register;
