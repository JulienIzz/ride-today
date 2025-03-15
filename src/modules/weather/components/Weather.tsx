import styled from "@emotion/native";
import { ActivityIndicator } from "react-native";

import { useLocationStore } from "#modules/location/hooks/useLocationStore.hook";
import { CurrentWeather } from "#modules/weather/components/CurrentWeather";
import { ForecastWeather } from "#modules/weather/components/ForecastWeather";
import { QueryErrorBoundary } from "#shared/infra/boundaries/QueryBoundary";

export const Weather = () => {
  const location = useLocationStore((state) => state.location);

  return (
    <Container>
      <QueryErrorBoundary
        resetKeys={[location]}
        loadingFallback={
          <LoaderContainer>
            <ActivityIndicator />
          </LoaderContainer>
        }
      >
        <CurrentWeather location={location} />
        <ForecastWeather location={location} />
      </QueryErrorBoundary>
    </Container>
  );
};

const Container = styled.View(({ theme }) => ({
  flex: 1,
  padding: theme.spacings.m,
  gap: theme.spacings.s,
}));

const LoaderContainer = styled.View({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
});
