import styled from "@emotion/native";
import { t } from "@lingui/core/macro";
import { MapPin, RectangleEllipsis, X } from "lucide-react-native";

import { useLocationStore } from "#modules/location/hooks/useLocationStore.hook";
import { useWeather } from "#modules/weather/hooks/useCurrentWeather.query";
import { Spacer } from "#shared/components/Spacer";
import { Typography } from "#shared/fonts/Typography";
import { QueryErrorBoundary } from "#shared/infra/boundaries/QueryBoundary";

export const LocationDisplay = () => {
  const location = useLocationStore((state) => state.location);

  return (
    <QueryErrorBoundary
      errorFallback={<LocationError />}
      resetKeys={[location]}
    >
      {location ? (
        <LocationDisplayComponent location={location} />
      ) : (
        <LocationMissing />
      )}
    </QueryErrorBoundary>
  );
};

const LocationDisplayComponent = ({ location }: { location: string }) => {
  const { currentLocation } = useWeather(location);
  return (
    <Container>
      <MapPin color="black" size={14} />
      <Spacer size={4} horizontal />
      <Typography variant="body" text={`${currentLocation.name}`} />
      {currentLocation.region ? (
        <Typography variant="body" text={`, ${currentLocation.region}`} />
      ) : null}
      {currentLocation.country ? (
        <Typography variant="body" text={`, ${currentLocation.country}`} />
      ) : null}
    </Container>
  );
};

const LocationMissing = () => {
  return (
    <Container>
      <RectangleEllipsis color="black" strokeWidth={1.5} />
      <Spacer size={4} horizontal />
      <Typography variant="body" text={t`Waiting for location`} />
    </Container>
  );
};

const LocationError = () => {
  return (
    <Container>
      <X color="red" size={14} />
      <Spacer size={4} horizontal />
      <Typography variant="body" text={"Unable to find location, try again"} />
    </Container>
  );
};

const Container = styled.View({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
});
