import { memo } from 'react';
import {
  Menu,
  MenuTarget,
  MenuDropdown,
  MenuLabel,
  MenuItem,
  ActionIcon,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconDots, IconTrash } from '@tabler/icons-react';

import { DeleteChatModal } from './DeleteChatModal';
import { type ChatMenuProps } from './interfaces';

export const ChatMenu = memo(function ChatMenu({ chatId }: ChatMenuProps) {
  const [opened, { open, close }] = useDisclosure();

  if (!chatId) return null;

  return (
    <>
      <Menu shadow="md" position="bottom-end" withArrow>
        <MenuTarget>
          <ActionIcon variant="default" size="36">
            <IconDots style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
          </ActionIcon>
        </MenuTarget>

        <MenuDropdown>
          <MenuLabel>Управление чатом</MenuLabel>
          <MenuItem
            color="red"
            onClick={open}
            leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
          >
            Удалить чат
          </MenuItem>
        </MenuDropdown>
      </Menu>
      <DeleteChatModal chatId={chatId} opened={opened} onClose={close} />
    </>
  );
});
