import { memo } from 'react';
import { Outlet } from 'react-router-dom';

import { RootShell } from '@/components';

const Root = memo(() => (
  <RootShell>
    <Outlet />
  </RootShell>
));

export default Root;
