import { useTheme } from "@emotion/react";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import { useState } from "react";
import { View } from "react-native";

import { absoluteFillStyle } from "#design-system/utils/absoluteFillStyle";

export const HomeGradients = () => {
  const [bgLayout, setBgLayout] = useState({ width: 0, height: 0 });
  return (
    <View
      style={absoluteFillStyle}
      onLayout={({ nativeEvent: { layout } }) => setBgLayout(layout)}
    >
      <TopLeftGradient {...bgLayout} />
      <BottomRightGradient {...bgLayout} />
    </View>
  );
};

const TopLeftGradient = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  // const { width, height } = Dimensions.get("window");
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

const BottomRightGradient = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  // const { width, height } = Dimensions.get("window");
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
