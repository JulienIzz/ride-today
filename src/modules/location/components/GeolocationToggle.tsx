import { useTheme } from "@emotion/react";
import { MapPinned, Search } from "lucide-react-native";

import { BigIconSwitch } from "#design-system/components/Switch/BigIconSwitch";

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
      trackColors={{
        left: theme.colors.componentBackground,
        right: theme.colors.componentBackground,
      }}
      leftIcon={
        <Search
          color={
            !isLocationEnabled ? theme.colors.contrast : theme.colors.disabled
          }
          size={20}
        />
      }
      rightIcon={
        <MapPinned
          color={
            isLocationEnabled ? theme.colors.contrast : theme.colors.disabled
          }
          size={20}
        />
      }
    />
  );
};
