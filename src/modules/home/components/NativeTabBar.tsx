import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { useVerticalBarEdgeIOS } from "expo-status-bar";
import { type NativeSyntheticEvent } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Tabs, type TabSelectedEvent } from "react-native-screens";

import { useThemeScheme } from "#shared/hooks/useThemeScheme";

const TAB_KEYS = ["weather", "charts", "settings"];

const TAB_BAR_STRIP_HEIGHT = 50;

const transparentContainer = { backgroundColor: "transparent" };

export const NativeTabBar = ({
  selectedPage,
  onSelectPage,
}: {
  selectedPage: number;
  onSelectPage: (page: number) => void;
}) => {
  const { _ } = useLingui();
  const theme = useTheme();
  const scheme = useThemeScheme();

  const tabs = [
    { key: "weather", title: _(msg`Weather`), icon: "thermometer.sun" },
    { key: "charts", title: _(msg`Charts`), icon: "chart.xyaxis.line" },
    { key: "settings", title: _(msg`Settings`), icon: "gearshape" },
  ];

  return (
    <HostStrip pointerEvents="box-none">
      <Tabs.Host
        navStateRequest={{
          selectedScreenKey: TAB_KEYS[selectedPage] ?? "weather",
          baseProvenance: 0,
        }}
        onTabSelected={({
          nativeEvent,
        }: NativeSyntheticEvent<TabSelectedEvent>) => {
          if (nativeEvent.actionOrigin === "programmatic-js") return;
          const page = TAB_KEYS.indexOf(nativeEvent.selectedScreenKey);
          if (page !== -1 && page !== selectedPage) {
            onSelectPage(page);
          }
        }}
        nativeContainerStyle={transparentContainer}
        colorScheme={scheme === "dark" ? "dark" : "light"}
        ios={{ tabBarTintColor: theme.colors.primary }}
      >
        {tabs.map((tab) => (
          <Tabs.Screen
            key={tab.key}
            screenKey={tab.key}
            title={tab.title}
            ios={{ icon: { type: "sfSymbol", name: tab.icon } }}
            specialEffects={{
              repeatedTabSelection: { popToRoot: false, scrollToTop: false },
            }}
          />
        ))}
      </Tabs.Host>
    </HostStrip>
  );
};

const HostStrip = styled.View(() => {
  const { bottom, left, right } = useSafeAreaInsets();
  const verticalBarEdge = useVerticalBarEdgeIOS();

  // When iOS moves bars to a vertical rail (e.g. iPhone Duo), keep the host
  // inside the rail inset: the native host swallows every touch in its frame,
  // and the content is padded away from that inset anyway
  if (verticalBarEdge) {
    return {
      position: "absolute",
      top: 0,
      bottom: 0,
      [verticalBarEdge === "leading" ? "start" : "end"]: 0,
      width: Math.max(left, right),
    };
  }

  return {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: TAB_BAR_STRIP_HEIGHT + bottom,
  };
});
