import { memo } from 'react';
import { Title } from '@mantine/core';

import { getHeaderTitle } from '@/utils/getHeaderTitle';

import { type HeaderTitleProps } from './interfaces';

export const HeaderTitle = memo(function HeaderTitle({
  opened,
  participantFullName,
}: HeaderTitleProps) {
  const headerTitle = getHeaderTitle(opened, participantFullName);

  return <Title order={4}>{headerTitle}</Title>;
});
