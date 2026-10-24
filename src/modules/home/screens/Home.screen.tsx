import styled from "@emotion/native";
import { useCallback, useRef, useState } from "react";
import { Platform, View } from "react-native";
import PagerView from "react-native-pager-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Charts } from "#modules/charts/components/Charts";
import { HomeGradients } from "#modules/home/components/HomeGradient";
import { Logo } from "#modules/home/components/Logo";
import { NativeTabBar } from "#modules/home/components/NativeTabBar";
import { PageSelector } from "#modules/home/components/PageSelector";
import { BOTTOM_MENU_HEIGHT } from "#modules/home/utils/constants";
import { Location } from "#modules/location/components/Location";
import { LocationDisplay } from "#modules/location/components/LocationDisplay";
import { SettingsPage } from "#modules/settings/components/SettingsPage";
import { Weather } from "#modules/weather/components/Weather";
import { ShadedDivider } from "#shared/components/Divider";
import { PageTemplate } from "#shared/components/PageTemplate";
import { useHorizontalSafePadding } from "#shared/hooks/useHorizontalSafePadding";

export const Home = () => {
  const [selectedPage, setSelectedPage] = useState(0);

  const pagerViewRef = useRef<PagerView>(null);

  const setPage = useCallback((page: number) => {
    setSelectedPage(page);
    pagerViewRef.current?.setPage(page);
  }, []);

  return (
    <PageTemplate>
      <HomeGradients />
      <LocationContainer>
        <Logo />
        <Location />
        <LocationDisplay />
      </LocationContainer>
      <ShadedDivider />
      <PagerContainer
        ref={pagerViewRef}
        onPageSelected={({ nativeEvent }) => {
          setSelectedPage(nativeEvent.position);
        }}
      >
        <View key={1}>
          <Weather />
        </View>
        <View key={2}>
          <Charts />
        </View>
        <View key={3}>
          <SettingsPage />
        </View>
      </PagerContainer>
      {Platform.OS === "ios" ? (
        <NativeTabBar selectedPage={selectedPage} onSelectPage={setPage} />
      ) : (
        <BottomMenu>
          <PageSelector selectedPage={selectedPage} setPage={setPage} />
        </BottomMenu>
      )}
    </PageTemplate>
  );
};

const LocationContainer = styled.View(({ theme }) => {
  const { top } = useSafeAreaInsets();
  const horizontalPadding = useHorizontalSafePadding(theme.spacings.m);
  return {
    padding: theme.spacings.m,
    ...horizontalPadding,
    paddingTop: top ? top : theme.spacings.m,
    gap: theme.spacings.m,
  };
});

const PagerContainer = styled(PagerView)({
  flex: 1,
});

const BottomMenu = styled.View(({ theme }) => {
  const { bottom } = useSafeAreaInsets();

  return {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: bottom ? bottom + theme.spacings.m : theme.spacings.m,
    alignItems: "center",
    justifyContent: "center",
    height: BOTTOM_MENU_HEIGHT,
  };
});
