import { useMMKVBoolean, useMMKVString } from "react-native-mmkv";

import { storage, StorageKeys } from "#shared/mmkv/store";

export const useMMKVOnboarding = () => {
  const [hasReadOnboarding = false, setHasReadOnboarding] = useMMKVBoolean(
    StorageKeys.HAS_READ_ONBOARDING,
    storage,
  );

  return { hasReadOnboarding, setHasReadOnboarding };
};

export const useMMKVCustomTheme = () => {
  const [isCustomThemeEnabled = false, setIsCustomThemeEnabled] =
    useMMKVBoolean(StorageKeys.IS_CUSTOM_THEME_ENABLED, storage);

  return { isCustomThemeEnabled, setIsCustomThemeEnabled };
};

export const useMMKVTheme = () => {
  const [theme = "dark", setTheme] = useMMKVString(
    StorageKeys.CUSTOM_THEME,
    storage,
  );

  return { theme, setTheme };
};

export const useMMKVUnits = () => {
  const [isImperialEnabled = false, setIsImperialEnabled] = useMMKVBoolean(
    StorageKeys.IS_IMPERIAL_ENABLED,
    storage,
  );

  return { isImperialEnabled, setIsImperialEnabled };
};

export const useMMKVDebugReactQuery = () => {
  const [isDebugReactQueryEnabled = false, setIsDebugReactQueryEnabled] =
    useMMKVBoolean(StorageKeys.IS_DEBUG_REACT_QUERY_ENABLED, storage);

  return { isDebugReactQueryEnabled, setIsDebugReactQueryEnabled };
};
