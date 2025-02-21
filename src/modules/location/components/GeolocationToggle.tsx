import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { MapPin, Search } from "lucide-react-native";
import { Switch } from "src/design-system/components/Switch/Switch";

export const GeolocationToggle = ({
  isLocationEnabled,
  handleSwitch,
}: {
  isLocationEnabled: boolean;
  handleSwitch: () => void;
}) => {
  const theme = useTheme();
  return (
    <Container>
      <Search
        color={!isLocationEnabled ? theme.colors.black : theme.colors.gray}
        size={20}
      />
      <Switch value={isLocationEnabled} onPress={handleSwitch} />
      <MapPin
        color={isLocationEnabled ? theme.colors.black : theme.colors.gray}
        size={20}
      />
    </Container>
  );
};

const Container = styled.View(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacings.s,
}));
