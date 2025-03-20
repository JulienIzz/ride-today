import styled from "@emotion/native";
import { memo } from "react";

import { FlexView } from "#design-system/utils/FlexView";
import { LocationDisplay } from "#modules/location/components/LocationDisplay";
import { useLocationStore } from "#modules/location/hooks/useLocationStore.hook";
import { CurrentWeather } from "#modules/weather/components/CurrentWeather";
import { ForecastWeather } from "#modules/weather/components/ForecastWeather";

export const Weather = memo(() => {
  const location = useLocationStore((state) => state.location);

  return (
    <Container>
      <LocationDisplay location={location} />
      <CurrentWeather location={location} />
      <ForecastWeather location={location} />
    </Container>
  );
});
Weather.displayName = "Weather";

const Container = styled(FlexView)(({ theme }) => ({
  gap: theme.spacings.m,
}));
