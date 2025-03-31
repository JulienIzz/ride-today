import { useTheme } from "@emotion/react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

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
  const theme = useTheme();

  return (
    <LinearGradient
      colors={[theme.colors.primary, "transparent"]}
      start={[0, 0]}
      end={[0.57, 0.13]}
      style={styles.gradientStyle}
    />
  );
};

const BottomRightGradient = () => {
  const theme = useTheme();

  return (
    <LinearGradient
      colors={["transparent", theme.colors.primary]}
      start={[0.43, 0.48]}
      end={[1, 1]}
      style={styles.gradientStyle}
    />
  );
};

const styles = StyleSheet.create({
  gradientStyle: {
    ...absoluteFillStyle,
    opacity: 0.5,
  },
});
