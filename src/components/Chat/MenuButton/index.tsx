import { memo } from 'react';
import { ActionIcon, rem } from '@mantine/core';
import { IconDots } from '@tabler/icons-react';

export const MenuButton = memo(function MenuButton() {
  return (
    <ActionIcon variant="default" size="36">
      <IconDots style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
    </ActionIcon>
  );
});
