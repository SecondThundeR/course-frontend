import { useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { useCallback } from "react";

type UseThemeSwitchReturn = [boolean, () => void];

function useThemeSwitch(): UseThemeSwitchReturn {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const isLight = computedColorScheme === "light";

  const onThemeSwitch = useCallback(
    () => setColorScheme(isLight ? "dark" : "light"),
    [isLight, setColorScheme]
  );

  return [isLight, onThemeSwitch];
}

export default useThemeSwitch;
