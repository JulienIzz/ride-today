import styled from "@emotion/native";
import { useCallback, useRef, useState } from "react";
import { View } from "react-native";
import PagerView from "react-native-pager-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HomeGradients } from "#modules/home/components/HomeGradient";
import { Logo } from "#modules/home/components/Logo";
import { Menu } from "#modules/home/components/Menu/Menu";
import { PageSelector } from "#modules/home/components/PageSelector";
import { BOTTOM_MENU_HEIGHT } from "#modules/home/utils/constants";
import { Location } from "#modules/location/components/Location";
import { LocationDisplay } from "#modules/location/components/LocationDisplay";
import { PageTemplate } from "#modules/templates/components/PageTemplate";
import { Weather } from "#modules/weather/components/Weather";
import { Divider } from "#shared/components/Divider";

export const BOTTOM_MENU_HEIGHT = 64;

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
      <Divider />
      <PagerContainer
        ref={pagerViewRef}
        onPageSelected={({ nativeEvent }) => {
          setSelectedPage(nativeEvent.position);
        }}
      >
        <View key={1}>
          <Weather />
        </View>
        <View key={2}></View>
      </PagerContainer>
      <BottomMenu>
        <PageSelector selectedPage={selectedPage} setPage={setPage} />
      </BottomMenu>
      <Menu />
    </PageTemplate>
  );
};

const LocationContainer = styled.View(({ theme }) => {
  const { top } = useSafeAreaInsets();
  return {
    padding: theme.spacings.m,
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
    justifyContent: "flex-end",
    height: BOTTOM_MENU_HEIGHT,
  };
});
