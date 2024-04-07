import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar, NavLink as Link, Title, Text } from '@mantine/core';

import { MessageType } from '@/__generated__/graphql';

import { CHAT_ROUTE } from '@/constants/routes';

import { getAvatarLetters } from '@/utils/getAvatarLetters';
import { getFullName } from '@/utils/getFullName';
import { lastMessageDateFormat } from '@/utils/lastMessageDateFormat';

import { type ListElementProps } from './interfaces';

export const ListElement = memo(function ListElement({
  id,
  messages,
  participants,
  isActive,
  userId,
  closeNavbar,
}: ListElementProps) {
  const lastMessage = messages.at(-1);
  const { firstname, lastname } = participants.find(({ id }) => id !== userId)!;

  const isConversationEmpty = lastMessage === undefined;
  const isLatex = lastMessage?.type === MessageType.Latex;
  const isSentByCurrentUser = lastMessage?.from?.id === userId;
  const isLatexOrEmpty = isLatex || isConversationEmpty;

  return (
    <Link
      component={NavLink}
      to={`${CHAT_ROUTE}/${id}`}
      onClick={closeNavbar}
      variant="light"
      active={isActive}
      leftSection={
        <Avatar color="blue" size="md" radius="xl">
          {getAvatarLetters(firstname, lastname)}
        </Avatar>
      }
      rightSection={
        <Text c={isActive ? undefined : 'dimmed'} size="sm">
          {lastMessageDateFormat(lastMessage?.createdAt as string)}
        </Text>
      }
      label={<Title order={5}>{getFullName(firstname, lastname)}</Title>}
      description={
        <Text
          lineClamp={isLatex ? 2 : 1}
          fs={isLatexOrEmpty ? 'italic' : undefined}
          c={isLatexOrEmpty ? 'dimmed' : undefined}
        >
          {isSentByCurrentUser && 'Вы: '}
          {isLatex ? 'LaTeX-сообщение' : lastMessage?.content}
          {isConversationEmpty && 'Пустой чат'}
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
