import { memo } from 'react';
import { Flex, Avatar, Title, Text, Button } from '@mantine/core';

import { extractAvatarLetters } from '@/utils/extractAvatarLetters';
import { extractFullName } from '@/utils/extractFullName';

import { type UserFooterProps } from './interfaces';

export const UserFooter = memo(function UserFooter({
  user,
  onSignout,
  onChatModalOpen,
}: UserFooterProps) {
  if (!user) return null;

  const { firstname, lastname, email } = user;
  const avatarLetters = extractAvatarLetters(firstname, lastname);
  const fullName = extractFullName(firstname, lastname);

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
