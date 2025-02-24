import styled from "@emotion/native";
import { ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { theme } from "src/design-system/theme/theme";

import { useAppIsReady } from "#shared/config/useAppIsReady.hook";
import { I18nProvider } from "#shared/i18n/I18n.provider";

void SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

const queryClient = new QueryClient();

export default function RootLayout() {
  const { appIsReady } = useAppIsReady();

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
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <RootView onLayout={onLayoutRootView}>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: {
                  backgroundColor: theme.colors.white,
                },
              }}
            />
          </RootView>
        </QueryClientProvider>
      </ThemeProvider>
    </I18nProvider>
  );
}

const RootView = styled.View({
  flex: 1,
});
