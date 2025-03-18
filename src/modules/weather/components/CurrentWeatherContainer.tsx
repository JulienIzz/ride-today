import styled from "@emotion/native";
import { MapPinOff } from "lucide-react-native";
import { ActivityIndicator } from "react-native";

export const CurrentWeatherContainer = styled.View(({ theme }) => ({
  height: 230,
  width: "100%",
  backgroundColor: theme.colors.primary,
  borderRadius: theme.borderRadius.xl,
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

export const WeatherLocationLoading = () => {
  return (
    <CurrentWeatherContainer>
      <CenteredView>
        <ActivityIndicator />
      </CenteredView>
    </CurrentWeatherContainer>
  );
};

const CenteredView = styled.View({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
});
