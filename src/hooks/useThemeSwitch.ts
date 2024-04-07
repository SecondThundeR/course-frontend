import { useCallback } from 'react';
import { useComputedColorScheme, useMantineColorScheme } from '@mantine/core';

const DEFAULT_THEME = 'light';

export function useThemeSwitch() {
  const { setColorScheme } = useMantineColorScheme();
  const isLight =
    useComputedColorScheme(DEFAULT_THEME, {
      getInitialValueInEffect: true,
    }) === 'light';

  const onThemeSwitch = useCallback(
    () => setColorScheme(isLight ? 'dark' : 'light'),
    [isLight, setColorScheme]
  );

  return { isLight, onThemeSwitch };
}
