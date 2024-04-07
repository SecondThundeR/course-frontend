import { memo } from 'react';
import { Outlet } from 'react-router-dom';

import { RootShell } from '@/components';

export const Component = memo(() => (
  <RootShell>
    <Outlet />
  </RootShell>
));

Component.displayName = 'Root';
