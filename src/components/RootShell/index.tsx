import { type PropsWithChildren } from 'react';
import { AppShell, Flex, Title, Button } from '@mantine/core';
import { Link } from 'react-router-dom';

import { LOGIN_ROUTE, REGISTER_ROUTE } from '@/constants/routes';

import { useRootShellData } from '@/hooks';

import { ThemeToggle } from '../';

function RootShell({ children }: PropsWithChildren) {
  const { pinned, isMobile } = useRootShellData();

  return (
    <AppShell header={{ height: 60, collapsed: !pinned, offset: false }}>
      <AppShell.Header>
        <Flex h="100%" px="md" align="center" justify="space-between">
          <Title order={isMobile ? 6 : 4}>Project Prometheus</Title>
          <Flex gap={8}>
            <Button component={Link} to={LOGIN_ROUTE}>
              Вход
            </Button>
            <Button component={Link} to={REGISTER_ROUTE} variant="default">
              Регистрация
            </Button>
            <ThemeToggle />
          </Flex>
        </Flex>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

export default RootShell;
