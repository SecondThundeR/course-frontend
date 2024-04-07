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
  const isConversationEmpty = !lastMessage;
  const isLatex = lastMessage?.type === MessageType.Latex;
  const isLatexOrEmpty = isLatex || isConversationEmpty;
  const isSentByCurrentUser = lastMessage?.from?.id === userId;

  const otherParticipant = participants.find(({ id }) => id !== userId)!;
  const avatarLetters = getAvatarLetters(otherParticipant.firstname, otherParticipant.lastname);
  const fullName = getFullName(otherParticipant.firstname, otherParticipant.lastname);

  const textStyles = {
    lineClamp: isLatex ? 2 : 1,
    fs: isLatexOrEmpty ? 'italic' : undefined,
    c: isLatexOrEmpty ? 'dimmed' : undefined,
  };
  const linkDestination = `${CHAT_ROUTE}/${id}`;
  const formattedTime = lastMessageDateFormat(lastMessage?.createdAt as string);

  return (
    <Link
      component={NavLink}
      to={linkDestination}
      onClick={closeNavbar}
      variant="light"
      active={isActive}
      leftSection={
        <Avatar color="blue" size="md" radius="xl">
          {avatarLetters}
        </Avatar>
      }
      rightSection={
        <Text c={isActive ? undefined : 'dimmed'} size="sm">
          {formattedTime}
        </Text>
      }
      label={<Title order={5}>{fullName}</Title>}
      description={
        <Text {...textStyles}>
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
