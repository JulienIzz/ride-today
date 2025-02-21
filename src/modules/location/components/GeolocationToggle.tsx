import styled from "@emotion/native";
import { MapPin, Search } from "lucide-react-native";
import { Switch } from "src/design-system/components/Switch/Switch";

export const GeolocationToggle = ({
  isLocationEnabled,
  handleSwitch,
}: {
  isLocationEnabled: boolean;
  handleSwitch: () => void;
}) => {
  return (
    <Container>
      <Search color={!isLocationEnabled ? "black" : "grey"} size={20} />
      <Switch value={isLocationEnabled} onPress={handleSwitch} />
      <MapPin color={isLocationEnabled ? "black" : "grey"} size={20} />
    </Container>
  );
};

const Container = styled.View({
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: 8,
});
