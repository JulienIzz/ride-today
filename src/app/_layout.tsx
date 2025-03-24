import styled from "@emotion/native";
import { ThemeProvider, useTheme } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { darkTheme, lightTheme } from "src/design-system/theme/theme";

import { GlobalModal } from "#modules/modal/GlobalModal";
import { useAppIsReady } from "#shared/config/useAppIsReady.hook";
import { useThemeScheme } from "#shared/hooks/useThemeScheme";
import { I18nProvider } from "#shared/i18n/I18n.provider";

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

const RootStack = () => {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.appBackground,
        },
      }}
    />
  );
};

const RootView = styled.View({
  flex: 1,
});
