import styled from "@emotion/native";
import { MapPin, X } from "lucide-react-native";

import { useLocationStore } from "#modules/location/hooks/useLocationStore.hook";
import { useCurrentWeather } from "#modules/weather/hooks/useCurrentWeather.query";
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
      {location && <LocationDisplayComponent location={location} />}
    </QueryErrorBoundary>
  );
};

const LocationDisplayComponent = ({ location }: { location: string }) => {
  const { currentLocation } = useCurrentWeather(location);
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

const LocationError = () => {
  return (
    <ErrorContainer>
      <X color="red" size={14} />
      <Spacer size={4} horizontal />
      <Typography variant="body" text={"Unable to find location, try again"} />
    </ErrorContainer>
  );
};

const ErrorContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
});

const Container = styled.View({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
});
