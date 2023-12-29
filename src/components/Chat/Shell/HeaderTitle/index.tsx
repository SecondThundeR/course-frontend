import { memo } from 'react';
import { Title, em } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { getHeaderTitle } from '@/utils/getHeaderTitle';

import { type HeaderTitleProps } from './interfaces';

export const HeaderTitle = memo(function HeaderTitle({
  opened,
  participantFullName,
}: HeaderTitleProps) {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const headerTitle = getHeaderTitle(opened, participantFullName);

  return isMobile ? <Title order={4}>{headerTitle}</Title> : <Title order={3}>Чаты</Title>;
});
