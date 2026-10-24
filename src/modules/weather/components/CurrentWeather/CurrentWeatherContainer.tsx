import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { MapPinOff, Search } from "lucide-react-native";
import { ActivityIndicator, View } from "react-native";

import { Typography } from "#shared/fonts/Typography";
import { useHorizontalSafePadding } from "#shared/hooks/useHorizontalSafePadding";
import { shadowStyle } from "#shared/styling/shadowStyle";

export const CurrentWeatherContainer = styled.View(({ theme }) => ({
  height: 280,
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

export const WeatherLocationWaiting = () => {
  const theme = useTheme();
  const { _ } = useLingui();
  const style = useWeatherContainerStyle();

  return (
    <View style={style}>
      <CurrentWeatherContainer>
        <CenteredView>
          <Search color={theme.colors.neutral["100"]} size={50} />
          <Typography
            color={theme.colors.neutral["100"]}
            variant="P1"
            bold
            text={_(msg`Search your location with the input above`)}
            center
          />
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
  const horizontalPadding = useHorizontalSafePadding(theme.spacings.m);

  return {
    gap: theme.spacings.m,
    padding: theme.spacings.m,
    ...horizontalPadding,
  };
};

const CenteredView = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacings.m,
  gap: theme.spacings.m,
}));
