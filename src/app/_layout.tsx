import styled from "@emotion/native";
import { ThemeProvider, useTheme } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { Platform, StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DevToolsBubble } from "react-native-react-query-devtools";
import { darkTheme, lightTheme } from "src/design-system/theme/theme";

import { GlobalModal } from "#modules/modal/GlobalModal";
import { useAppIsReady } from "#shared/config/useAppIsReady.hook";
import { useOnboarding } from "#shared/hooks/useOnboarding";
import { useThemeScheme } from "#shared/hooks/useThemeScheme";
import { I18nProvider } from "#shared/i18n/I18n.provider";
import { useMMKVDebugReactQuery } from "#shared/mmkv/useMMKV";

export const isWeb = Platform.OS === "web";

void SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

const queryClient = new QueryClient();

export default function RootLayout() {
  const { appIsReady } = useAppIsReady();
  const scheme = useThemeScheme();

  const { isDebugReactQueryEnabled } = useMMKVDebugReactQuery();

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hide();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  if (isWeb) {
    return (
      <ThemeProvider theme={scheme === "dark" ? darkTheme : lightTheme}>
        <BackgroundWebMobile />
        <RootView onLayout={onLayoutRootView}>
          <RootStack />
        </RootView>
      </ThemeProvider>
    );
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
            {isDebugReactQueryEnabled && <DevToolsBubble />}
          </QueryClientProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </I18nProvider>
  );
}

const RootStack = () => {
  const theme = useTheme();
  useOnboarding();

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

const RootView = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.appBackground,
  flex: 1,
}));

const BackgroundWebMobile = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.appBackground,
  position: "absolute",
  height: "150%",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
}));
