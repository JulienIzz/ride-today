import { useColorScheme } from "react-native";
import { useMMKVBoolean, useMMKVString } from "react-native-mmkv";

import { storage, StorageKeys } from "#shared/mmkv/store";

export const useThemeScheme = () => {
  const scheme = useColorScheme();
  const [isCustomThemeEnabled = false] = useMMKVBoolean(
    StorageKeys.IS_CUSTOM_THEME_ENABLED,
    storage,
  );
  const [theme = "dark"] = useMMKVString(StorageKeys.CUSTOM_THEME, storage);

  if (isCustomThemeEnabled) {
    return theme;
  }

  return scheme;
};
