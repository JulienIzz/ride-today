import { useTheme } from "@emotion/react";
import { MapPinned, Search } from "lucide-react-native";
import { useEffect } from "react";

import { ContentSwitch } from "#design-system/components/Switch/ContentSwitch";
import { useDeviceGeolocation } from "#modules/location/hooks/useDeviceGeolocation.hook";
import { useLocationStore } from "#modules/location/hooks/useLocationStore.hook";
import { QueryErrorBoundary } from "#shared/infra/boundaries/QueryBoundary";
import { shadowStyle } from "#shared/styling/shadowStyle";

const toggleTrackStyle = {
  width: 120,
  height: 40,
  padding: 5,
};

export const GeolocationToggle = ({
  isLocationEnabled,
  handleSwitch,
}: {
  isLocationEnabled: boolean;
  handleSwitch: () => void;
}) => {
  const theme = useTheme();
  return (
    <ContentSwitch
      value={isLocationEnabled}
      onPress={handleSwitch}
      trackStyle={toggleTrackStyle}
      trackColors={{
        left: theme.colors.background.component,
        right: theme.colors.background.component,
      }}
      containerStyle={{ boxShadow: shadowStyle }}
      leftComponent={
        <Search
          color={
            !isLocationEnabled
              ? theme.colors.neutral["100"]
              : theme.colors.inactive
          }
          size={20}
        />
      }
      rightComponent={
        isLocationEnabled ? <LocationPinBoundary /> : <LocationPin disabled />
      }
    />
  );
};

const LocationPin = ({ disabled }: { disabled?: boolean }) => {
  const theme = useTheme();
  return (
    <MapPinned
      color={disabled ? theme.colors.inactive : theme.colors.neutral["100"]}
      size={20}
    />
  );
};

const LocationPinBoundary = () => {
  return (
    <QueryErrorBoundary errorFallback={<LocationPinError />}>
      <LocationPinData />
    </QueryErrorBoundary>
  );
};

const LocationPinData = () => {
  const { locationString } = useDeviceGeolocation();

  const setLocation = useLocationStore((state) => state.setLocation);

  useEffect(() => {
    setLocation(locationString);
  }, [locationString, setLocation]);

  return <LocationPin />;
};

const LocationPinError = () => {
  return <LocationPin />;
};
