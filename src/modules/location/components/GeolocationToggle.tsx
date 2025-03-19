import { useTheme } from "@emotion/react";
import { MapPinned, Search } from "lucide-react-native";

import { BigIconSwitch } from "#design-system/components/Switch/BigIconSwitch";
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
    <BigIconSwitch
      value={isLocationEnabled}
      onPress={handleSwitch}
      trackStyle={toggleTrackStyle}
      trackColors={{
        left: theme.colors.componentBackground,
        right: theme.colors.componentBackground,
      }}
      containerStyle={{ boxShadow: shadowStyle }}
      leftIcon={
        <Search
          color={
            !isLocationEnabled ? theme.colors.contrast : theme.colors.inactive
          }
          size={20}
        />
      }
      rightIcon={
        <MapPinned
          color={
            isLocationEnabled ? theme.colors.contrast : theme.colors.inactive
          }
          size={20}
        />
      }
    />
  );
};
