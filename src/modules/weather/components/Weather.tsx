import styled from "@emotion/native";
import { memo } from "react";

import { useLocationStore } from "#modules/location/hooks/useLocationStore.hook";
import { CurrentWeather } from "#modules/weather/components/CurrentWeather";
import {
  WeatherLocationLoading,
  WeatherLocationMissing,
} from "#modules/weather/components/CurrentWeatherContainer";
import { ForecastWeather } from "#modules/weather/components/ForecastWeather";
import { QueryErrorBoundary } from "#shared/infra/boundaries/QueryBoundary";

export const Weather = memo(() => {
  const location = useLocationStore((state) => state.location);

  return (
    <Container>
      <QueryErrorBoundary
        resetKeys={[location]}
        loadingFallback={<WeatherLocationLoading />}
        errorFallback={<WeatherLocationMissing />}
      >
        <CurrentWeather location={location} />
        <ForecastWeather location={location} />
      </QueryErrorBoundary>
    </Container>
  );
});
Weather.displayName = "Weather";

const Container = styled.View(({ theme }) => ({
  flex: 1,
  padding: theme.spacings.m,
  gap: theme.spacings.m,
}));
