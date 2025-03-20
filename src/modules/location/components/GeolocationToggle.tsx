import { useTheme } from "@emotion/react";
import { MapPinned, Search } from "lucide-react-native";

import { ContentSwitch } from "#design-system/components/Switch/ContentSwitch";
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
        left: theme.colors.componentBackground,
        right: theme.colors.componentBackground,
      }}
      containerStyle={{ boxShadow: shadowStyle }}
      leftComponent={
        <Search
          color={
            !isLocationEnabled ? theme.colors.contrast : theme.colors.inactive
          }
          size={20}
        />
      }
      rightComponent={
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
