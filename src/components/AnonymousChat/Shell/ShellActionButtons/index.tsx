import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActionIcon, Group } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';

import ThemeToggle from '@/components/ThemeToggle';

import { ROOT_ROUTE } from '@/constants/routes';

import { type ShellActionButtonsProps } from './interfaces';

export function ShellActionButtons({ clearAssignedUsername }: ShellActionButtonsProps) {
  const navigate = useNavigate();

  const onExit = useCallback(() => {
    clearAssignedUsername();
    navigate(ROOT_ROUTE);
  }, [clearAssignedUsername, navigate]);

  return (
    <Group>
      <ThemeToggle />
      <ActionIcon onClick={onExit} size={36} aria-label="Выход">
        <IconLogout size={20} stroke={1.5} />
      </ActionIcon>
    </Group>
  );
}
