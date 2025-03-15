import styled from "@emotion/native";
import { t } from "@lingui/core/macro";
import { MapPinOff } from "lucide-react-native";

import { useLocationStore } from "#modules/location/hooks/useLocationStore.hook";
import { CurrentWeather } from "#modules/weather/components/CurrentWeather";
import { Typography } from "#shared/fonts/Typography";
import { QueryErrorBoundary } from "#shared/infra/boundaries/QueryBoundary";

export const Weather = () => {
  const location = useLocationStore((state) => state.location);

  return (
    <Container>
      <WeatherContainer>
        {location ? (
          <QueryErrorBoundary>
            <CurrentWeather location={location} />
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
        <Typography variant="body" text={t`No location selected`} />
        <Typography variant="body" text={t`select one or select geolocation`} />
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
