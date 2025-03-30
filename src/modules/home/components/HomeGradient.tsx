import { useTheme } from "@emotion/react";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import { Dimensions, View } from "react-native";

import { absoluteFillStyle } from "#design-system/utils/absoluteFillStyle";

export const HomeGradients = () => {
  return (
    <View style={absoluteFillStyle}>
      <TopLeftGradient />
      <BottomRightGradient />
    </View>
  );
};

const TopLeftGradient = () => {
  const { width, height } = Dimensions.get("screen");
  const theme = useTheme();
  return (
    <Canvas style={absoluteFillStyle}>
      <Rect opacity={0.5} x={0} y={0} width={width} height={height}>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(250, 125)}
          colors={[theme.colors.primary, "transparent"]}
        />
      </Rect>
    </Canvas>
  );
};

const BottomRightGradient = () => {
  const { width, height } = Dimensions.get("screen");
  const theme = useTheme();
  return (
    <Canvas style={absoluteFillStyle}>
      <Rect opacity={0.5} x={0} y={0} width={width} height={height}>
        <LinearGradient
          start={vec(width - 250, height - 500)}
          end={vec(width, height)}
          colors={["transparent", theme.colors.primary]}
        />
      </Rect>
    </Canvas>
  );
};
