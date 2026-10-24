import styled from "@emotion/native";
import { useCallback, useRef, useState } from "react";
import { Platform, useWindowDimensions, View } from "react-native";
import PagerView from "react-native-pager-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Charts } from "#modules/charts/components/Charts";
import { DualPager } from "#modules/home/components/DualPager";
import { HomeGradients } from "#modules/home/components/HomeGradient";
import { Logo } from "#modules/home/components/Logo";
import { NativeTabBar } from "#modules/home/components/NativeTabBar";
import { PageSelector } from "#modules/home/components/PageSelector";
import {
  BOTTOM_MENU_HEIGHT,
  DUAL_PAGE_MIN_WIDTH,
} from "#modules/home/utils/constants";
import { Location } from "#modules/location/components/Location";
import { LocationDisplay } from "#modules/location/components/LocationDisplay";
import { SettingsPage } from "#modules/settings/components/SettingsPage";
import { Weather } from "#modules/weather/components/Weather";
import { ShadedDivider } from "#shared/components/Divider";
import { PageTemplate } from "#shared/components/PageTemplate";
import { useHorizontalSafePadding } from "#shared/hooks/useHorizontalSafePadding";

const SETTINGS_PAGE = 2;

// With two pages shown, the charts page is visible in both positions, so the
// tab bar only offers weather (position 0) and settings (position 1)
const DUAL_PAGE_HIDDEN_TABS = [1];
const pageToDualPosition = (page: number) => (page === SETTINGS_PAGE ? 1 : 0);
const dualPositionToPage = (position: number) =>
  position === 1 ? SETTINGS_PAGE : 0;

const pages = [
  <Weather key="weather" />,
  <Charts key="charts" />,
  <SettingsPage key="settings" />,
];

export const Home = () => {
  const [selectedPage, setSelectedPage] = useState(0);
  const { width } = useWindowDimensions();
  const isDualPage = width >= DUAL_PAGE_MIN_WIDTH;

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
      {isDualPage ? (
        <DualPager
          pages={pages}
          position={pageToDualPosition(selectedPage)}
          onPositionChange={(position) => {
            setSelectedPage(dualPositionToPage(position));
          }}
        />
      ) : (
        <PagerContainer
          ref={pagerViewRef}
          initialPage={selectedPage}
          onPageSelected={({ nativeEvent }) => {
            setSelectedPage(nativeEvent.position);
          }}
        >
          {pages.map((page) => (
            <View key={page.key}>{page}</View>
          ))}
        </PagerContainer>
      )}
      {Platform.OS === "ios" ? (
        <NativeTabBar
          selectedPage={
            isDualPage
              ? dualPositionToPage(pageToDualPosition(selectedPage))
              : selectedPage
          }
          onSelectPage={setPage}
          hiddenPages={isDualPage ? DUAL_PAGE_HIDDEN_TABS : []}
        />
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
