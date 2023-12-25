import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar, NavLink as Link, Title, Text } from '@mantine/core';

import { MessageType } from '@/__generated__/graphql';

import { CHAT_ROUTE } from '@/constants/routes';

import { type ConversationInfo } from '@/store';

import { extractAvatarLetters } from '@/utils/extractAvatarLetters';
import { extractFullName } from '@/utils/extractFullName';
import { lastMessageDateFormat } from '@/utils/lastMessageDateFormat';

type ListElementProps = Omit<ConversationInfo, 'createdAt' | 'updatedAt'> & {
  userId?: string;
  isActive: boolean;
  closeNavbar: () => void;
};

export const ListElement = memo(function ListElement({
  id,
  messages,
  participants,
  userId,
  isActive,
  closeNavbar,
}: ListElementProps) {
  const message = messages[messages.length - 1];
  const { firstname, lastname } = participants.filter((user) => user.id !== userId)[0];
  const avatarLetters = extractAvatarLetters(firstname, lastname);
  const fullName = extractFullName(firstname, lastname);
  const formattedTime = lastMessageDateFormat(message.createdAt as string);
  const isLatex = message.type === MessageType.Latex;
  const isSentByCurrentUser = message.from?.id === userId;

  return (
    <Link
      component={NavLink}
      to={`${CHAT_ROUTE}/${id}`}
      onClick={closeNavbar}
      variant="light"
      active={isActive}
      leftSection={
        <Avatar color="blue" size="md" radius="xl">
          {avatarLetters}
        </Avatar>
      }
      label={<Title order={4}>{fullName}</Title>}
      description={
        <Text
          lineClamp={isLatex ? 2 : 1}
          fs={isLatex ? 'italic' : undefined}
          c={isLatex ? 'dimmed' : undefined}
        >
          {isSentByCurrentUser && 'Вы: '}
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
