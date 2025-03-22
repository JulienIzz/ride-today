import styled from "@emotion/native";
import { ThemeProvider, useTheme } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useMMKVBoolean, useMMKVString } from "react-native-mmkv";
import { darkTheme, lightTheme } from "src/design-system/theme/theme";

import { GlobalModal } from "#modules/modal/GlobalModal";
import { useAppIsReady } from "#shared/config/useAppIsReady.hook";
import { I18nProvider } from "#shared/i18n/I18n.provider";
import { storage, StorageKeys } from "#shared/mmkv/store";

void SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

const queryClient = new QueryClient();

export default function RootLayout() {
  const { appIsReady } = useAppIsReady();
  const scheme = useThemeScheme();

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hide();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <I18nProvider>
      <ThemeProvider theme={scheme === "dark" ? darkTheme : lightTheme}>
        <GestureHandlerRootView>
          <QueryClientProvider client={queryClient}>
            <StatusBar hidden />
            <RootView onLayout={onLayoutRootView}>
              <RootStack />
              <GlobalModal />
            </RootView>
          </QueryClientProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </I18nProvider>
  );
}

const useThemeScheme = () => {
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

const RootStack = () => {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.mainBackground,
        },
      }}
    />
  );
};

const RootView = styled.View({
  flex: 1,
});
