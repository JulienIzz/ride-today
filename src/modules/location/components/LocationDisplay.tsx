import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { t } from "@lingui/core/macro";
import { CircleX, MapPin, RectangleEllipsis } from "lucide-react-native";
import { ActivityIndicator } from "react-native";

import { useLocationStore } from "#modules/location/hooks/useLocationStore.hook";
import { useWeather } from "#modules/weather/hooks/useCurrentWeather.query";
import { Spacer } from "#shared/components/Spacer";
import { Typography } from "#shared/fonts/Typography";
import { QueryErrorBoundary } from "#shared/infra/boundaries/QueryBoundary";

export const LocationDisplay = () => {
  const location = useLocationStore((state) => state.location);
  const isLocationEnabled = useLocationStore(
    (state) => state.isLocationEnabled,
  );

  if (location) {
    return (
      <QueryErrorBoundary
        loadingFallback={<LoadingLocation />}
        errorFallback={<LocationError />}
      >
        <LocationDisplayComponent location={location} />
      </QueryErrorBoundary>
    );
  }

  if (isLocationEnabled) {
    return <LocationMissing />;
  }

  return <LocationWaiting />;
};

const LocationDisplayComponent = ({ location }: { location: string }) => {
  const { currentLocation } = useWeather(location);
  const theme = useTheme();

  return (
    <Container>
      <MapPin color={theme.colors.neutral[0]} />
      <Typography
        color={theme.colors.neutral[0]}
        variant="P1"
        numberOfLines={1}
        text={`${currentLocation.name}, ${currentLocation.region}, ${currentLocation.country}`}
      />
    </Container>
  );
};

const LoadingLocation = () => {
  const theme = useTheme();
  return (
    <Container>
      <ActivityIndicator size={"small"} />
      <Spacer size={4} horizontal />
      <Typography
        color={theme.colors.neutral[0]}
        variant="P1"
        text={t`Loading location`}
      />
    </Container>
  );
};

const LocationWaiting = () => {
  const theme = useTheme();
  return (
    <Container>
      <RectangleEllipsis color={theme.colors.neutral[0]} strokeWidth={1.5} />
      <Spacer size={4} horizontal />
      <Typography
        color={theme.colors.neutral[0]}
        variant="P1"
        text={t`Type location or enable geolocation`}
      />
    </Container>
  );
};

const LocationMissing = () => {
  const theme = useTheme();
  return (
    <Container>
      <RectangleEllipsis color={theme.colors.neutral[0]} strokeWidth={1.5} />
      <Spacer size={4} horizontal />
      <Typography
        color={theme.colors.neutral[0]}
        variant="P1"
        text={t`Waiting for location`}
      />
    </Container>
  );
};

const LocationError = () => {
  const theme = useTheme();
  return (
    <Container>
      <CircleX color={theme.colors.neutral[0]} strokeWidth={1.5} />
      <Spacer size={4} horizontal />
      <Typography
        color={theme.colors.neutral[0]}
        variant="P1"
        text={t`Unable to find location`}
      />
    </Container>
  );
};

const Container = styled.View(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacings.xs,
  paddingHorizontal: theme.spacings.m,
  height: 24,
}));
