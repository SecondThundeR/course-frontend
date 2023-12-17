import { memo } from 'react';
import { Outlet } from 'react-router-dom';

import { RootShell } from '@/components';

const Root = memo(function Root() {
  return (
    <RootShell>
      <Outlet />
    </RootShell>
  );
});

export default Root;
