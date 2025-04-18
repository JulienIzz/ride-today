/* eslint-disable react-native/no-inline-styles */
import styled from "@emotion/native";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

import { absoluteFillStyle } from "#design-system/utils/absoluteFillStyle";

export const Divider = styled.View(({ theme }) => ({
  height: 1,
  width: "100%",
  backgroundColor: theme.colors.neutral[0],
  opacity: 0.2,
}));

export const VerticalDivider = styled.View(({ theme }) => ({
  width: 1,
  height: "100%",
  backgroundColor: theme.colors.neutral[0],
  opacity: 0.2,
}));

export const ShadedDivider = () => (
  <Divider>
    <View
      style={{
        ...absoluteFillStyle,
        height: 10,
      }}
    >
      <LinearGradient
        colors={["black", "transparent"]}
        start={[0, 0]}
        end={[0, 1]}
        style={{
          ...absoluteFillStyle,
          opacity: 0.5,
        }}
      />
    </View>
  </Divider>
);
