import { useTheme } from "@emotion/react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

import { absoluteFillStyle } from "#design-system/utils/absoluteFillStyle";

export const TopRightGradient = () => {
  const theme = useTheme();

  return (
    <LinearGradient
      colors={[theme.colors.primary, "transparent"]}
      start={[1, 0]}
      end={[0.43, 0.1]}
      style={styles.gradientStyle}
    />
  );
};

export const TopRightGradientSmall = () => {
  const theme = useTheme();

  return (
    <LinearGradient
      colors={[theme.colors.primary, "transparent"]}
      locations={[0, 0.4]}
      start={[1, 0]}
      end={[0.5, 0.5]}
      style={styles.gradientStyle}
    />
  );
};

const styles = StyleSheet.create({
  gradientStyle: {
    ...absoluteFillStyle,
    opacity: 0.2,
  },
});
