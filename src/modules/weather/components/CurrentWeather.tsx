import styled from "@emotion/native";
import { MapPinOff } from "lucide-react-native";

import { useLocationStore } from "#modules/location/hooks/useLocationStore.hook";
import { CurrentWeatherData } from "#modules/weather/components/CurrentWeatherData";
import { Typography } from "#shared/fonts/Typography";
import { QueryErrorBoundary } from "#shared/infra/boundaries/QueryBoundary";

export const CurrentWeather = () => {
  const location = useLocationStore((state) => state.location);

  return (
    <Container>
      <WeatherContainer>
        {location ? (
          <QueryErrorBoundary>
            <CurrentWeatherData location={location} />
          </QueryErrorBoundary>
        ) : (
          <NoLocation />
        )}
      </WeatherContainer>
    </Container>
  );
};

const NoLocation = () => {
  return (
    <NoLocationContainer>
      <MapPinOff color="black" size={50} />
      <LabelContainer>
        <Typography variant="body" text="No location selected" />
        <Typography
          variant="body"
          text="Please select one or select geolocation"
        />
      </LabelContainer>
    </NoLocationContainer>
  );
};

const Container = styled.View(({ theme }) => ({
  height: 200,
  width: "100%",
  padding: theme.spacings.m,
}));

const WeatherContainer = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.lightGray,
  borderRadius: theme.borderRadius.xl,
  padding: theme.spacings.m,
}));

const NoLocationContainer = styled.View(({ theme }) => ({
  flex: 1,
  gap: theme.spacings.m,
  justifyContent: "center",
  alignItems: "center",
}));

const LabelContainer = styled.View(({ theme }) => ({
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacings.xs,
}));
