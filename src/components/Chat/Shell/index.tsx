import { memo } from 'react';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { AppShell, Flex, Group, Burger, Title, ScrollArea, em } from '@mantine/core';
import { Outlet, useParams } from 'react-router-dom';

import { SearchInput } from '@/components/SearchInput';
import { ThemeToggle } from '@/components/ThemeToggle';

import { useCurrentUser, useModal } from '@/hooks';

import { CreateModal } from '../CreateModal';
import { List } from '../List';
import { UserFooter } from '../UserFooter';
import { useConversationsStore } from '@/store';
import { extractFullName } from '@/utils/extractFullName';

export const Shell = memo(function Shell() {
  const { userData, onSignout } = useCurrentUser();
  const { modalOpened, onOpen, onClose } = useModal();
  const [opened, { toggle }] = useDisclosure();
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const { chatId } = useParams();
  const conversations = useConversationsStore((state) => state.conversations);
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
