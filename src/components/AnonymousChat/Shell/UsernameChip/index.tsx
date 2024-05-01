import { Chip, Group } from '@mantine/core';

import { type UsernameChipProps } from './interfaces';

export function UsernameChip({ username }: UsernameChipProps) {
  if (!username) return null;

  return (
    <Group>
      <Chip checked={false}>Вы: {username}</Chip>
    </Group>
  );
}
