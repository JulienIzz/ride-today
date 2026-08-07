import { createMMKV } from "react-native-mmkv";

export const storage = createMMKV();

export enum StorageKeys {
  IS_IMPERIAL_ENABLED = "isImperialEnabled",
  IS_CUSTOM_THEME_ENABLED = "isCustomThemeEnabled",
  CUSTOM_THEME = "customTheme",
  HAS_READ_ONBOARDING = "hasReadOnboarding",
  IS_DEBUG_REACT_QUERY_ENABLED = "isDebugReactQueryEnabled",
  APP_LAUNCH_COUNT = "appLaunchCount",
  HAS_REQUESTED_STORE_REVIEW = "hasRequestedStoreReview",
}
