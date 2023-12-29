import { memo } from 'react';
import { ActionIcon } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

import { useThemeSwitch } from '@/hooks';

import { type ThemeToggleProps } from './interfaces';

const ThemeToggle = memo(function ThemeToggle({
  buttonSize = 36,
  iconSize = 20,
  iconStroke = 1.5,
}: ThemeToggleProps) {
  const { isLight, onThemeSwitch } = useThemeSwitch();
  const Icon = isLight ? IconSun : IconMoon;

  return (
    <ActionIcon onClick={onThemeSwitch} variant="default" size={buttonSize} aria-label="Смена темы">
      <Icon size={iconSize} stroke={iconStroke} />
    </ActionIcon>
  );
});

export default ThemeToggle;
