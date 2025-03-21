import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { t } from "@lingui/core/macro";
import { MapPin, RectangleEllipsis } from "lucide-react-native";
import { ActivityIndicator } from "react-native";

import { useWeather } from "#modules/weather/hooks/useCurrentWeather.query";
import { Spacer } from "#shared/components/Spacer";
import { Typography } from "#shared/fonts/Typography";
import { QueryErrorBoundary } from "#shared/infra/boundaries/QueryBoundary";

export const LocationDisplay = ({
  location,
}: {
  location: string | undefined;
}) => {
  if (!location) {
    return <LocationMissing />;
  }

  return (
    <SizeWrapper>
      <QueryErrorBoundary loadingFallback={<LoadingLocation />}>
        <LocationDisplayComponent location={location} />
      </QueryErrorBoundary>
    </SizeWrapper>
  );
};

const LocationDisplayComponent = ({ location }: { location: string }) => {
  const { currentLocation } = useWeather(location);
  const theme = useTheme();

  return (
    <Container>
      <MapPin color={theme.colors.contrastLight} />
      <ContrastLightTypography
        variant="P1"
        numberOfLines={1}
        text={`${currentLocation.name}, ${currentLocation.region}, ${currentLocation.country}`}
      />
    </Container>
  );
};

const LoadingLocation = () => {
  return (
    <Container>
      <ActivityIndicator size={"small"} />
      <Spacer size={4} horizontal />
      <ContrastLightTypography variant="P1" text={t`Loading location`} />
    </Container>
  );
};

const LocationMissing = () => {
  const theme = useTheme();
  return (
    <Container>
      <RectangleEllipsis color={theme.colors.contrastLight} strokeWidth={1.5} />
      <Spacer size={4} horizontal />
      <ContrastLightTypography variant="P1" text={t`Waiting for location`} />
    </Container>
  );
};

const Container = styled.View(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacings.xs,
}));

const ContrastLightTypography = styled(Typography)(({ theme }) => ({
  color: theme.colors.contrastLight,
}));

const SizeWrapper = styled.View({
  height: 24,
});
