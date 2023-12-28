import { memo } from 'react';
import { Menu, ActionIcon, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconDots, IconTrash } from '@tabler/icons-react';

import { DeleteChatModal } from './DeleteChatModal';
import { type ChatMenuProps } from './interfaces';

export const ChatMenu = memo(function ChatMenu({ chatId }: ChatMenuProps) {
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      <Menu shadow="md" position="bottom-end" withArrow>
        <Menu.Target>
          <ActionIcon variant="default" size="36">
            <IconDots style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Управление чатом</Menu.Label>
          <Menu.Item
            color="red"
            onClick={open}
            leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
          >
            Удалить чат
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <DeleteChatModal chatId={chatId} opened={opened} onClose={close} />
    </>
  );
});
