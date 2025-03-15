/* eslint-disable react-native/no-unused-styles */
/* eslint-disable react-native/no-inline-styles */

import type { ViewProps, ViewStyle } from "react-native";
import { View } from "react-native";

export const AbsoluteFillView = (props: ViewProps) => {
  return (
    <View
      style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      {...props}
    />
  );
};

export const absoluteFillStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
} as ViewStyle;
