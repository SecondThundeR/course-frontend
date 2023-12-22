import { memo } from 'react';
import {
  AppShell,
  Burger,
  Group,
  ScrollArea,
  Title,
  Flex,
  Button,
  Avatar,
  Text,
  NavLink as Link,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconMessageDots } from '@tabler/icons-react';
import { NavLink, Outlet, useParams } from 'react-router-dom';

import { CHAT_ROUTE } from '@/constants/routes';

import { useConversationsStore, type ConversationInfo, type User } from '@/store';

import { ThemeToggle } from '../ThemeToggle';
import { SearchInput } from '../SearchInput';

import classes from './ChatBlocks.module.css';

interface ChatShellProps {
  user: User | null;
  onSignout: () => void;
}

type UserFooterProps = Pick<ChatShellProps, 'user' | 'onSignout'>;

type ChatListProps = {
  user: User | null;
  currentChatId?: string;
};

type ChatListElementProps = Omit<ConversationInfo, 'createdAt' | 'updatedAt'> & {
  userId?: string;
  isActive: boolean;
};

const UserFooter = memo(function UserFooter({ user, onSignout }: UserFooterProps) {
  if (!user) return null;

  const { firstname, lastname, email } = user;
  const avatarLetters = firstname[0] ?? '' + lastname?.[0] ?? '';
  const fullName = `${firstname}${!!lastname && ` ${user.lastname}`}`;

  return (
    <Flex direction="column" gap="sm">
      <Flex gap="md" align="center">
        <Avatar color="blue" size="md" radius="xl">
          {avatarLetters}
        </Avatar>
        <Flex direction="column">
          <Title order={5}>{fullName}</Title>
          <Text c="dimmed">{email}</Text>
        </Flex>
      </Flex>
      <Button fullWidth onClick={onSignout}>
        Выход из аккаунта
      </Button>
    </Flex>
  );
});

const ChatListElement = memo(function ChatListElement({
  id,
  messages,
  participants,
  userId,
  isActive,
}: ChatListElementProps) {
  const message = messages[messages.length - 1];
  const { firstname, lastname } = participants.filter((user) => user.id !== userId)[0];

  const fullName = `${firstname}${lastname ? ` ${lastname}` : ''}`;
  const avatarLetters = `${firstname[0]}${lastname ? `${lastname[0]}` : ''}`;
  const sentTime = new Date(message.createdAt as string);
  const formattedTime = `${sentTime.getHours()}:${
    sentTime.getMinutes() < 10 ? `0${sentTime.getMinutes()}` : sentTime.getMinutes()
  }`;

  return (
    <Link
      component={NavLink}
      to={`${CHAT_ROUTE}/${id}`}
      variant="light"
      active={isActive}
      leftSection={
        <Avatar color="blue" size="md" radius="xl">
          {avatarLetters}
        </Avatar>
      }
      label={<Title order={4}>{fullName}</Title>}
      description={<Text>{message.content}</Text>}
      rightSection={
        <Text c={!isActive ? 'dimmed' : undefined} size="sm">
          {formattedTime}
        </Text>
      }
      styles={{
        root: {
          borderRadius: 8,
        },
      }}
    />
  );
});

const ChatList = memo(function ChatList({ user, currentChatId }: ChatListProps) {
  const { conversations } = useConversationsStore();

  return (
    <>
      {conversations.map((conversation) => (
        <ChatListElement
          key={conversation.id}
          userId={user?.id}
          isActive={conversation.id === currentChatId}
          {...conversation}
        />
      ))}
    </>
  );
});

const ChatShell = memo(function ChatShell({ ...currentUserData }: ChatShellProps) {
  const [opened, { toggle }] = useDisclosure();
  const { chatId } = useParams();

  return (
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
          <ChatList user={currentUserData.user} currentChatId={chatId} />
        </AppShell.Section>
        <AppShell.Section>
          <UserFooter {...currentUserData} />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
});

const ChatPlaceholder = memo(function ChatPlaceholder() {
  return (
    <Flex
      direction="column"
      gap="md"
      justify="center"
      align="center"
      className={classes.placeholder__wrapper}
    >
      <IconMessageDots
        style={{ width: rem(96), height: rem(96) }}
        stroke={1.5}
        color="var(--mantine-color-blue-filled)"
      />
      <Title ta="center">Выберите чат из списка, чтобы продолжить</Title>
    </Flex>
  );
});

const ChatBase = memo(function ChatBase() {
  throw new Error("Doesn't use this `Chat` component. Export other components via dot notation");
});

export const ChatBlocks = Object.assign(ChatBase, {
  Shell: ChatShell,
  Placeholder: ChatPlaceholder,
});
