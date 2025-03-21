import styled from "@emotion/native";
import { MapPinOff } from "lucide-react-native";

import { shadowStyle } from "#shared/styling/shadowStyle";

export const CurrentWeatherContainer = styled.View(({ theme }) => ({
  height: 265,
  width: "100%",
  backgroundColor: theme.colors.primary,
  borderRadius: theme.borderRadius.xl,
  boxShadow: shadowStyle,
}));

export const WeatherLocationMissing = () => {
  return (
    <CurrentWeatherContainer>
      <CenteredView>
        <MapPinOff color="black" size={50} />
      </CenteredView>
    </CurrentWeatherContainer>
  );
};

const CenteredView = styled.View({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
});
