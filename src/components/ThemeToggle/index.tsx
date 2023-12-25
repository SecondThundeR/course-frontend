import { memo } from 'react';
import { ActionIcon } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

import { useThemeSwitch } from '@/hooks';

import classes from './ThemeToggle.module.css';

const ThemeToggle = memo(function ThemeToggle() {
  const [isLight, onThemeSwitch] = useThemeSwitch();
  const Icon = isLight ? IconSun : IconMoon;

  return (
    <ActionIcon onClick={onThemeSwitch} variant="default" size="36" aria-label="Смена темы">
      <Icon className={classes.icon} stroke={1.5} />
    </ActionIcon>
  );
});

export default ThemeToggle;
