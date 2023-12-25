import { memo } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Flex, Group, Burger, Title, ScrollArea } from '@mantine/core';
import { Outlet, useParams } from 'react-router-dom';

import { SearchInput } from '@/components/SearchInput';
import { ThemeToggle } from '@/components/ThemeToggle';

import { useCurrentUser, useModal } from '@/hooks';

import { CreateModal } from '../CreateModal';
import { List } from '../List';
import { UserFooter } from '../UserFooter';

export const Shell = memo(function Shell() {
  const { userData, onSignout } = useCurrentUser();
  const { modalOpened, onOpen, onClose } = useModal();
  const [opened, { toggle }] = useDisclosure();
  const { chatId } = useParams();

  return (
    <>
      <CreateModal opened={modalOpened} onClose={onClose} />
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      >
        <AppShell.Header>
          <Flex h="100%" px="md" gap="md" justify="space-between" align="center">
            <Group>
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
              <Title order={3}>Чаты</Title>
            </Group>
            <ThemeToggle />
          </Flex>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <AppShell.Section>
            <SearchInput />
          </AppShell.Section>
          <AppShell.Section grow my="md" component={ScrollArea}>
            <List user={userData} currentChatId={chatId} />
          </AppShell.Section>
          <AppShell.Section>
            <UserFooter user={userData} onSignout={onSignout} onChatModalOpen={onOpen} />
          </AppShell.Section>
        </AppShell.Navbar>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </>
  );
});
