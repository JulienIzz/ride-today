import { useTheme } from "@emotion/react";
import { memo } from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FlexView } from "#design-system/utils/FlexView";
import { useLocationStore } from "#modules/location/hooks/useLocationStore.hook";
import { CurrentWeather } from "#modules/weather/components/CurrentWeather";
import { ForecastWeather } from "#modules/weather/components/ForecastWeather";

export const Weather = memo(() => {
  const location = useLocationStore((state) => state.location);

  const scrollViewStyle = useScrollViewStyle();

  return (
    <FlexView>
      <ScrollView contentContainerStyle={scrollViewStyle}>
        <CurrentWeather location={location} />
        <ForecastWeather location={location} />
      </ScrollView>
    </FlexView>
  );
});
Weather.displayName = "Weather";

const useScrollViewStyle = () => {
  const theme = useTheme();

  const { bottom } = useSafeAreaInsets();

  return {
    gap: theme.spacings.m,
    padding: theme.spacings.m,
    paddingBottom: bottom + theme.spacings.s,
  };
};
