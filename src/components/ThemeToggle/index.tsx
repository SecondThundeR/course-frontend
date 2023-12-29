import { memo } from 'react';
import { ActionIcon } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

import { THEME_TOGGLE_DEFAULTS } from '@/constants/defaultOptions';

import { useThemeSwitch } from '@/hooks';

import { type ThemeToggleProps } from './interfaces';

const ThemeToggle = memo(function ThemeToggle({
  buttonSize = THEME_TOGGLE_DEFAULTS.buttonSize,
  iconSize = THEME_TOGGLE_DEFAULTS.iconSize,
  iconStroke = THEME_TOGGLE_DEFAULTS.iconStroke,
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
