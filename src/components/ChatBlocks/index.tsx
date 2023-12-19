import { memo } from 'react';
import {
  AppShell,
  Burger,
  Group,
  ScrollArea,
  Skeleton,
  Title,
  Flex,
  Button,
  Avatar,
  Text,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconMessageDots } from '@tabler/icons-react';
import { Outlet } from 'react-router-dom';

import { type User } from '@/store';

import { ThemeToggle } from '../ThemeToggle';
import { SearchInput } from '../SearchInput';

import classes from './ChatBlocks.module.css';

interface ChatShellProps {
  user: User | null;
  onSignout: () => void;
}

interface UserFooterProps extends Pick<ChatShellProps, 'user' | 'onSignout'> {}

const UserFooter = memo(function UserFooter({ user, onSignout }: UserFooterProps) {
  if (!user) return null;

  const { firstname, lastname, email } = user;
  const avatarLetters = firstname[0] ?? '' + lastname?.[0] ?? '';
  const fullName = `${firstname}${!!lastname && ` ${user.lastname}`}`;

  return (
    <Flex direction="column" gap="sm">
      <Flex gap="md" align="center">
        <Avatar color="cyan" size="md" radius="xl">
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

const ChatShell = memo(function ChatShell({ ...currentUserData }: ChatShellProps) {
  const [opened, { toggle }] = useDisclosure();

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
          Chats placeholder
          {Array(30)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} h={28} mt="sm" animate={false} />
            ))}
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
