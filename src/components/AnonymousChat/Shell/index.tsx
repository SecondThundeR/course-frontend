import { memo } from 'react';
import { AppShell, Flex } from '@mantine/core';

import { useAnonymousChatUsername } from '@/hooks';

import ChatRoom from '../ChatRoom';

import { ShellActionButtons } from './ShellActionButtons';
import { ShellTitle } from './ShellTitle';
import { UsernameChip } from './UsernameChip';
import { UsernameGenerateFailure } from './UsernameGenerateFailure';

const Shell = memo(function Shell() {
  const { username, isFailedToGetUsername, clearAssignedUsername } = useAnonymousChatUsername();

  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header>
        <Flex h="100%" px="md" gap="md" justify="space-between" align="center">
          <ShellTitle />
          <UsernameChip username={username} />
          <ShellActionButtons clearAssignedUsername={clearAssignedUsername} />
        </Flex>
      </AppShell.Header>
      <AppShell.Main>
        {isFailedToGetUsername ? <UsernameGenerateFailure /> : <ChatRoom username={username} />}
      </AppShell.Main>
    </AppShell>
  );
});

export default Shell;
