import { memo } from 'react';
import { Title } from '@mantine/core';

import { getHeaderTitle } from '@/utils/getHeaderTitle';

import { type HeaderTitleProps } from './interfaces';

export const HeaderTitle = memo(function HeaderTitle({
  opened,
  participantFullName,
}: HeaderTitleProps) {
  return <Title order={4}>{getHeaderTitle(opened, participantFullName)}</Title>;
});
