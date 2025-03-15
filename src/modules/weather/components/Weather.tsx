import styled from "@emotion/native";

import { useLocationStore } from "#modules/location/hooks/useLocationStore.hook";
import { CurrentWeather } from "#modules/weather/components/CurrentWeather";
import { ForecastWeather } from "#modules/weather/components/ForecastWeather";
import { QueryErrorBoundary } from "#shared/infra/boundaries/QueryBoundary";

export const Weather = () => {
  const location = useLocationStore((state) => state.location);

  return (
    <QueryErrorBoundary>
      <Container>
        <CurrentWeather location={location} />
        <ForecastWeather location={location} />
      </Container>
    </QueryErrorBoundary>
  );
};

const Container = styled.View(({ theme }) => ({
  flex: 1,
  padding: theme.spacings.m,
  gap: theme.spacings.s,
}));
