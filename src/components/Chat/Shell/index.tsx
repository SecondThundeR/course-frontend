import { memo } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Flex, Group, Burger, ScrollArea } from '@mantine/core';
import { Outlet, useParams } from 'react-router-dom';

import { SearchInput, ThemeToggle } from '@/components';

import { useCurrentUser, useSearch } from '@/hooks';

import { useConversationsStore } from '@/store';

import { getCurrentChatParticipantFullName } from '@/utils/getCurrentChatParticipantFullName';

import { CreateModal } from '../CreateModal';
import { List } from '../List';
import { ChatMenu } from '../ChatMenu';
import { UserFooter } from '../UserFooter';

import { HeaderTitle } from './HeaderTitle';

const Shell = memo(function Shell() {
  const { chatId } = useParams();
  const [opened, { toggle, close }] = useDisclosure();
  const [modalOpened, { open: onOpen, close: onClose }] = useDisclosure();
  const conversations = useConversationsStore.use.conversations();
  const { q, inputRef, onChange } = useSearch();
  const { userData, onSignout } = useCurrentUser();
  const { id, email, firstname, lastname } = { ...userData };

  const participantFullName = getCurrentChatParticipantFullName({
    conversations,
    chatId,
    userId: id,
  });

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      >
        <AppShell.Header>
          <Flex h="100%" px="md" gap="md" justify="space-between" align="center">
            <Group>
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
              <HeaderTitle opened={opened} participantFullName={participantFullName} />
            </Group>
            <Group>
              <ThemeToggle />
              <ChatMenu chatId={chatId} />
            </Group>
          </Flex>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <AppShell.Section>
            <SearchInput ref={inputRef} value={q} onChange={onChange} />
          </AppShell.Section>
          <AppShell.Section grow my="md" component={ScrollArea}>
            <List
              userId={userData?.id}
              currentChatId={chatId}
              closeNavbar={close}
              searchValue={q}
            />
          </AppShell.Section>
          <AppShell.Section>
            <UserFooter
              firstname={firstname}
              lastname={lastname}
              email={email}
              onSignout={onSignout}
              onChatModalOpen={onOpen}
            />
          </AppShell.Section>
        </AppShell.Navbar>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
      <CreateModal opened={modalOpened} onClose={onClose} />
    </>
  );
});

export default Shell;
