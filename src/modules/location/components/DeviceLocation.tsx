import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { t } from "@lingui/core/macro";
import { X } from "lucide-react-native";
import { useEffect } from "react";
import Animated, { FadeIn } from "react-native-reanimated";

import { LocationDisplay } from "#modules/location/components/LocationDisplay";
import { useDeviceGeolocation } from "#modules/location/hooks/useDeviceGeolocation.hook";
import { useLocationStore } from "#modules/location/hooks/useLocationStore.hook";
import { Spacer } from "#shared/components/Spacer";
import { Typography } from "#shared/fonts/Typography";
import { QueryErrorBoundary } from "#shared/infra/boundaries/QueryBoundary";

export const DeviceLocation = () => {
  return (
    <QueryErrorBoundary errorFallback={<LocationError />}>
      <DeviceLocationBoundary />
    </QueryErrorBoundary>
  );
};

const DeviceLocationBoundary = () => {
  const { locationString } = useDeviceGeolocation();
  const setLocation = useLocationStore((state) => state.setLocation);

  useEffect(() => {
    setLocation(locationString);
  }, [locationString, setLocation]);

  return (
    <Animated.View entering={FadeIn}>
      <LocationDisplay />
    </Animated.View>
  );
};

const LocationError = () => {
  const theme = useTheme();

  return (
    <Container>
      <X color="red" />
      <Spacer size={4} horizontal />
      <Typography
        variant="body"
        color={theme.colors.contrastLight}
        text={t`Geolocation failed`}
      />
    </Container>
  );
};

const Container = styled.View({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
});
