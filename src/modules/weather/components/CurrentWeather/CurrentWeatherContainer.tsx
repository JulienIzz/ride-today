import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { MapPinOff } from "lucide-react-native";
import { ActivityIndicator, View } from "react-native";

import { shadowStyle } from "#shared/styling/shadowStyle";

export const CurrentWeatherContainer = styled.View(({ theme }) => ({
  height: 265,
  width: "100%",
  backgroundColor: theme.colors.primary,
  borderRadius: theme.borderRadius.m,
  boxShadow: shadowStyle,
}));

export const WeatherLocationMissing = () => {
  const theme = useTheme();
  const style = useWeatherContainerStyle();

  return (
    <View style={style}>
      <CurrentWeatherContainer>
        <CenteredView>
          <MapPinOff color={theme.colors.neutral["100"]} size={50} />
        </CenteredView>
      </CurrentWeatherContainer>
    </View>
  );
};

export const WeatherLoading = () => {
  const style = useWeatherContainerStyle();

  return (
    <View style={style}>
      <CurrentWeatherContainer>
        <CenteredView>
          <ActivityIndicator />
        </CenteredView>
      </CurrentWeatherContainer>
    </View>
  );
};

export const useWeatherContainerStyle = () => {
  const theme = useTheme();

  return {
    gap: theme.spacings.m,
    padding: theme.spacings.m,
  };
};

const CenteredView = styled.View({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
});
