import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { t } from "@lingui/core/macro";
import { MapPin, RectangleEllipsis } from "lucide-react-native";

import { useLocationStore } from "#modules/location/hooks/useLocationStore.hook";
import { useWeather } from "#modules/weather/hooks/useCurrentWeather.query";
import { Spacer } from "#shared/components/Spacer";
import { Typography } from "#shared/fonts/Typography";

export const LocationDisplay = () => {
  const location = useLocationStore((state) => state.location);

  if (!location) {
    return <LocationMissing />;
  }

  return <LocationDisplayComponent location={location} />;
};

const LocationDisplayComponent = ({ location }: { location: string }) => {
  const { currentLocation } = useWeather(location);
  const theme = useTheme();

  return (
    <Container>
      <MapPin color={theme.colors.contrastLight} size={14} />
      <Spacer size={4} horizontal />
      <ContrastLightTypography
        variant="body"
        text={`${currentLocation.name}`}
      />
      {currentLocation.region ? (
        <ContrastLightTypography
          variant="body"
          text={`, ${currentLocation.region}`}
        />
      ) : null}
      {currentLocation.country ? (
        <ContrastLightTypography
          variant="body"
          text={`, ${currentLocation.country}`}
        />
      ) : null}
    </Container>
  );
};

const LocationMissing = () => {
  const theme = useTheme();
  return (
    <Container>
      <RectangleEllipsis color={theme.colors.contrastLight} strokeWidth={1.5} />
      <Spacer size={4} horizontal />
      <ContrastLightTypography variant="body" text={t`Waiting for location`} />
    </Container>
  );
};

const Container = styled.View({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
});

const ContrastLightTypography = styled(Typography)(({ theme }) => ({
  color: theme.colors.contrastLight,
}));
