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
  Modal,
  TextInput,
  Checkbox,
  Alert,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { IconMessage2, IconMessage2Plus, IconCircleX } from '@tabler/icons-react';
import { NavLink, Outlet, useParams } from 'react-router-dom';

import { CHAT_ROUTE } from '@/constants/routes';

import { useChatCreate, useCurrentUser, useModal } from '@/hooks';

import { useConversationsStore, type ConversationInfo, type User } from '@/store';

import { MessageType } from '@/__generated__/graphql';

import { ThemeToggle } from '../ThemeToggle';
import { SearchInput } from '../SearchInput';

import classes from './ChatBlocks.module.css';

interface UserFooterProps {
  user: User | null;
  onSignout: () => void;
  onChatModalOpen: () => void;
}

type ChatListProps = {
  user: User | null;
  currentChatId?: string;
};

type ChatListElementProps = Omit<ConversationInfo, 'createdAt' | 'updatedAt'> & {
  userId?: string;
  isActive: boolean;
};

type ChatCreateModalProps = {
  opened: boolean;
  onClose: () => void;
};

const UserFooter = memo(function UserFooter({ user, onSignout, onChatModalOpen }: UserFooterProps) {
  if (!user) return null;

  const { firstname, lastname, email } = user;
  const avatarLetters = `${firstname[0]}${!!lastname ? `${lastname[0]}` : ''}`;
  const fullName = `${firstname}${!!lastname ? ` ${lastname}` : ''}`;

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
      <Flex gap="md">
        <Button fullWidth variant="default" onClick={onChatModalOpen}>
          Создать чат
        </Button>
        <Button fullWidth onClick={onSignout}>
          Выход
        </Button>
      </Flex>
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
  const avatarLetters = `${firstname[0]}${!!lastname ? `${lastname[0]}` : ''}`;
  const sentTime = new Date(message.createdAt as string);
  const formattedTime = `${sentTime.getHours()}:${
    sentTime.getMinutes() < 10 ? `0${sentTime.getMinutes()}` : sentTime.getMinutes()
  }`;
  const isLatex = message.type === MessageType.Latex;

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
      description={
        <Text fs={isLatex ? 'italic' : undefined} c={isLatex ? 'dimmed' : undefined}>
          {isLatex ? 'LaTeX-сообщение' : message.content}
        </Text>
      }
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

const ChatCreateModal = memo(function ChatCreateModal({ opened, onClose }: ChatCreateModalProps) {
  const form = useForm({
    initialValues: {
      email: '',
      message: '',
      isLatex: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Неправильная почта'),
      message: (value) => (value.length > 0 ? null : 'Сообщение не может быть пустым'),
    },
  });
  const { loading, error, onCreate } = useChatCreate();

  return (
    <Modal opened={opened} onClose={onClose} title="Создать чат" centered>
      <form
        onSubmit={form.onSubmit((values) => {
          onCreate({ ...values, onClose }).catch(console.error);
        })}
      >
        {error && (
          <Alert
            mb="md"
            variant="filled"
            color="red"
            title="Не удалось создать чат"
            icon={<IconCircleX />}
          >
            {error.message}
          </Alert>
        )}
        <TextInput
          withAsterisk
          type="email"
          label="Почта собеседника"
          placeholder="Введите почту"
          disabled={loading}
          {...form.getInputProps('email')}
        />
        <TextInput
          withAsterisk
          mt="md"
          label="Сообщение"
          placeholder="Введите сообщение"
          disabled={loading}
          {...form.getInputProps('message')}
        />
        <Checkbox
          mt="md"
          labelPosition="left"
          label="Отправить как LaTeX сообщение"
          disabled={loading}
          {...form.getInputProps('isLatex')}
        />
        <Button mt="md" type="submit" fullWidth loading={loading}>
          Создать
        </Button>
      </form>
    </Modal>
  );
});

const ChatShell = memo(function ChatShell() {
  const { userData, onSignout } = useCurrentUser();
  const { modalOpened, onOpen, onClose } = useModal();
  const [opened, { toggle }] = useDisclosure();
  const { chatId } = useParams();

  return (
    <>
      <ChatCreateModal opened={modalOpened} onClose={onClose} />
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
            <ChatList user={userData} currentChatId={chatId} />
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

const ChatPlaceholder = memo(function ChatPlaceholder() {
  const { conversations } = useConversationsStore();
  const hasChats = conversations.length > 0;
  const iconSettings = {
    style: { width: rem(96), height: rem(96) },
    stroke: 1.5,
    color: 'var(--mantine-color-blue-filled)',
  };

  const icon = hasChats ? (
    <IconMessage2 {...iconSettings} />
  ) : (
    <IconMessage2Plus {...iconSettings} />
  );

  return (
    <Flex
      direction="column"
      gap="md"
      justify="center"
      align="center"
      className={classes.placeholder__wrapper}
    >
      {icon}
      <Title ta="center">
        {hasChats
          ? 'Выберите чат из списка, чтобы продолжить'
          : 'Похоже тут пусто. Самое время создать новый чат!'}
      </Title>
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
