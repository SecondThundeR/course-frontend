import { memo } from 'react';
import { ActionIcon } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

import useThemeSwitch from '@/hooks/useThemeSwitch';

import classes from './ThemeToggle.module.css';

const ThemeToggle = memo(() => {
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

export default ThemeToggle;
