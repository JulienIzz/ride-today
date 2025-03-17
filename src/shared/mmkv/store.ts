import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

export enum StorageKeys {
  IS_IMPERIAL_ENABLED = "isImperialEnabled",
  IS_CUSTOM_THEME_ENABLED = "isCustomThemeEnabled",
  CUSTOM_THEME = "customTheme",
}
