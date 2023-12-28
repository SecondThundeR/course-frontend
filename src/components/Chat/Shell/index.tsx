import { memo } from 'react';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { AppShell, Flex, Group, Burger, Title, ScrollArea, em } from '@mantine/core';
import { Outlet, useParams } from 'react-router-dom';

import { SearchInput, ThemeToggle } from '@/components';

import { useCurrentUser, useSearch } from '@/hooks';

import { useConversationsStore } from '@/store';

import { extractFullName } from '@/utils/extractFullName';

import { CreateModal } from '../CreateModal';
import { List } from '../List';
import { ChatMenu } from '../ChatMenu';
import { UserFooter } from '../UserFooter';

const Shell = memo(function Shell() {
  const { chatId } = useParams();
  const [opened, { toggle, close }] = useDisclosure();
  const [modalOpened, { open: onOpen, close: onClose }] = useDisclosure();
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const conversations = useConversationsStore((state) => state.conversations);
  const { q, inputRef, onChange } = useSearch();
  const { userData, onSignout } = useCurrentUser();

  const currentChatParticipant = conversations
    .filter((conversation) => conversation.id === chatId)
    .at(0)
    ?.participants.filter((participant) => participant.id !== userData?.id)
    .at(0);
  const participantFullName = !currentChatParticipant
    ? null
    : extractFullName(currentChatParticipant.firstname, currentChatParticipant.lastname);

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
              <Flex direction="column">
                {!isMobile && <Title order={3}>Чаты</Title>}
                {isMobile && (
                  <Title order={4}>
                    {opened || (!opened && !participantFullName)
                      ? 'Чаты'
                      : participantFullName
                        ? `Чат с ${participantFullName}`
                        : null}
                  </Title>
                )}
              </Flex>
            </Group>
            <Group>
              <ThemeToggle />
              {chatId !== undefined && <ChatMenu chatId={chatId} />}
            </Group>
          </Flex>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <AppShell.Section>
            <SearchInput ref={inputRef} value={q} onChange={onChange} />
          </AppShell.Section>
          <AppShell.Section grow my="md" component={ScrollArea}>
            <List user={userData} currentChatId={chatId} closeNavbar={close} searchValue={q} />
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

export default Shell;
