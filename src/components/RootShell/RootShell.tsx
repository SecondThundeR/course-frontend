import { PropsWithChildren } from 'react';
import { AppShell, rem, Flex, Title, Button } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';

import ThemeToggle from '../ThemeToggle/ThemeToggle';

export function RootShell({ children }: PropsWithChildren) {
  const pinned = useHeadroom({ fixedAt: 120 });

  return (
    <AppShell header={{ height: 60, collapsed: !pinned, offset: false }}>
      <AppShell.Header>
        <Flex h="100%" px="md" align="center" justify="space-between">
          <Title order={4}>Project Prometheus</Title>
          <Flex gap={8}>
            <Button>Вход</Button>
            <Button variant="default">Регистрация</Button>
            <ThemeToggle />
          </Flex>
        </Flex>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
