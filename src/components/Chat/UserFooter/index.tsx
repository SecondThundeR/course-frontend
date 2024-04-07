import { memo } from 'react';
import { Flex, Avatar, Title, Text, Button } from '@mantine/core';

import { getAvatarLetters } from '@/utils/getAvatarLetters';
import { getFullName } from '@/utils/getFullName';

import { type UserFooterProps } from './interfaces';

export const UserFooter = memo(function UserFooter({
  firstname,
  lastname,
  email,
  onSignout,
  onChatModalOpen,
}: UserFooterProps) {
  if (!firstname || !lastname || !email) return null;

  const avatarLetters = getAvatarLetters(firstname, lastname);
  const fullName = getFullName(firstname, lastname);

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
