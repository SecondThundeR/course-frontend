import { memo } from 'react';
import { ActionIcon } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

import { useThemeSwitch } from '@/hooks';

import classes from './ThemeToggle.module.css';

export const ThemeToggle = memo(function ThemeToggle() {
  const [isLight, onThemeSwitch] = useThemeSwitch();

  return (
    <ActionIcon onClick={onThemeSwitch} variant="default" size="36" aria-label="Смена темы">
      {isLight ? (
        <IconSun className={classes.icon} stroke={1.5} />
      ) : (
        <IconMoon className={classes.icon} stroke={1.5} />
      )}
    </ActionIcon>
  );
});
