import { Platform, useColorScheme } from "react-native";

import { useMMKVCustomTheme, useMMKVTheme } from "#shared/mmkv/useMMKV";

export const useThemeScheme = () => {
  const scheme = useColorScheme();
  const { isCustomThemeEnabled } = useMMKVCustomTheme();
  const { theme } = useMMKVTheme();

  if (Platform.OS === "web") {
    return "dark";
  }

  if (isCustomThemeEnabled) {
    return theme;
  }

  return scheme;
};
