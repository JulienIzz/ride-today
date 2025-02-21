import styled from "@emotion/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

import { useAppIsReady } from "#shared/config/useAppIsReady.hook";

void SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

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
    <RootView onLayout={onLayoutRootView}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </RootView>
  );
}

const RootView = styled.View({
  flex: 1,
});
