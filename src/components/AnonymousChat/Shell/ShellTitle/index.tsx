import { Group, Title, em } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export function ShellTitle() {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  if (isMobile) return null;

  return (
    <Group>
      <Title order={4}>Анонимный чат</Title>
    </Group>
  );
}
