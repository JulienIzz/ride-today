import { useTheme } from "@emotion/react";
import { useState } from "react";
import type { LayoutChangeEvent } from "react-native";
import { useAnimatedStyle, withTiming } from "react-native-reanimated";

export const useLocationInputContainerStyle = (isLocationEnabled: boolean) => {
  const theme = useTheme();

  const [totalWidth, setTotalWidth] = useState(0);
  const [switchWidth, setSwitchWidth] = useState(0);

  const setTotalWidthFromLayout = (event: LayoutChangeEvent) => {
    setTotalWidth(event.nativeEvent.layout.width);
  };
  const setSwitchWidthFromLayout = (event: LayoutChangeEvent) => {
    setSwitchWidth(event.nativeEvent.layout.width);
  };

  const availableWidth = totalWidth - switchWidth - theme.spacings.m;

  const locationInputContainerStyle = useAnimatedStyle(() => ({
    width: withTiming(isLocationEnabled ? 0 : availableWidth),
    marginRight: withTiming(isLocationEnabled ? 0 : theme.spacings.m),
    opacity: withTiming(isLocationEnabled ? 0 : 1, {
      duration: isLocationEnabled ? 200 : 400,
    }),
  }));

  return {
    locationInputContainerStyle,
    setTotalWidth: setTotalWidthFromLayout,
    setSwitchWidth: setSwitchWidthFromLayout,
  };
};
