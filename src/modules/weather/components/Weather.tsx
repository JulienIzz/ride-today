import { useTheme } from "@emotion/react";
import { memo } from "react";
import { RefreshControl, ScrollView } from "react-native";

import { FlexView } from "#design-system/utils/FlexView";
import { BOTTOM_MENU_HEIGHT } from "#modules/home/utils/constants";
import { useLocationStore } from "#modules/location/hooks/useLocationStore.hook";
import { CurrentWeather } from "#modules/weather/components/CurrentWeather";
import {
  useWeatherContainerStyle,
  WeatherLoading,
  WeatherLocationMissing,
} from "#modules/weather/components/CurrentWeatherContainer";
import { ForecastWeather } from "#modules/weather/components/ForecastWeather";
import { useWeather } from "#modules/weather/hooks/useCurrentWeather.query";
import { Spacer } from "#shared/components/Spacer";
import { QueryErrorBoundary } from "#shared/infra/boundaries/QueryBoundary";

export const Weather = memo(() => {
  const location = useLocationStore((state) => state.location);

  return (
    <FlexView>
      {location ? (
        <QueryErrorBoundary
          errorFallback={<WeatherLocationMissing />}
          loadingFallback={<WeatherLoading />}
          resetKeys={[location]}
        >
          <WeatherData location={location} />
        </QueryErrorBoundary>
      ) : (
        <WeatherLocationMissing />
      )}
    </FlexView>
  );
});
Weather.displayName = "Weather";

const WeatherData = ({ location }: { location: string }) => {
  const { forecastWeather, currentLocation, currentWeather, queryStates } =
    useWeather(location);

  const theme = useTheme();

  const scrollViewStyle = useWeatherContainerStyle();

  return (
    <ScrollView
      contentContainerStyle={scrollViewStyle}
      refreshControl={
        <RefreshControl
          refreshing={queryStates.isLoading}
          onRefresh={queryStates.refetch}
          tintColor={theme.colors.contrastLight}
        />
      }
      showsVerticalScrollIndicator={false}
    >
      <CurrentWeather
        currentWeather={currentWeather}
        currentLocation={currentLocation}
      />
      <ForecastWeather
        forecastWeather={forecastWeather}
        currentLocation={currentLocation}
      />
      <Spacer size={BOTTOM_MENU_HEIGHT} vertical />
    </ScrollView>
  );
};
