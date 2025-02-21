import styled from "@emotion/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

import { useAppIsReady } from "#shared/config/useAppIsReady.hook";

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
    <QueryClientProvider client={queryClient}>
      <RootView onLayout={onLayoutRootView}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </RootView>
    </QueryClientProvider>
  );
}

const RootView = styled.View({
  flex: 1,
});
