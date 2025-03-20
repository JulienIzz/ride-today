import { memo } from "react";

import { FlexView } from "#design-system/utils/FlexView";
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
    <FlexView>
      <QueryErrorBoundary
        resetKeys={[location]}
        loadingFallback={<WeatherLocationLoading />}
        errorFallback={<WeatherLocationMissing />}
      >
        <CurrentWeather location={location} />
        <ForecastWeather location={location} />
      </QueryErrorBoundary>
    </FlexView>
  );
});
Weather.displayName = "Weather";
