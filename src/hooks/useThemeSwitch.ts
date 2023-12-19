import { useCallback } from 'react';
import { useComputedColorScheme, useMantineColorScheme } from '@mantine/core';

export default function useThemeSwitch() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });
  const isLight = computedColorScheme === 'light';

  const onThemeSwitch = useCallback(
    () => setColorScheme(isLight ? 'dark' : 'light'),
    [isLight, setColorScheme]
  );

  return [isLight, onThemeSwitch] as const;
}
