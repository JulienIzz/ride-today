import type { ViewStyle } from "react-native";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type SwitchProps = {
  value: boolean;
  onPress: () => void;
  style?: ViewStyle;
  duration?: number;
  trackColors?: { on: string; off: string };
};

export const Switch = ({
  value,
  onPress,
  style = {
    width: 36,
    height: 20,
    padding: 4,
  },
  duration = 300,
  trackColors = { on: "grey", off: "grey" },
}: SwitchProps) => {
  const numberedValue = value ? 1 : 0;
  const height = useSharedValue(0);
  const width = useSharedValue(0);

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      numberedValue,
      [0, 1],
      [trackColors.off, trackColors.on],
    );
    const colorValue = withTiming(color, { duration });

    return {
      backgroundColor: colorValue,
      borderRadius: height.value / 2,
    };
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const moveValue = interpolate(
      Number(numberedValue),
      [0, 1],
      [0, width.value - height.value],
    );
    const translateValue = withTiming(moveValue, { duration });

    return {
      transform: [{ translateX: translateValue }],
      borderRadius: height.value / 2,
    };
  });

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
          width.value = e.nativeEvent.layout.width;
        }}
        style={[switchStyles.track, style, trackAnimatedStyle]}
      >
        <Animated.View
          style={[switchStyles.thumb, thumbAnimatedStyle]}
        ></Animated.View>
      </Animated.View>
    </Pressable>
  );
};

const switchStyles = StyleSheet.create({
  track: {
    alignItems: "flex-start",
    width: 100,
    height: 40,
    padding: 5,
    backgroundColor: "blue",
  },
  thumb: {
    height: "100%",
    aspectRatio: 1,
    backgroundColor: "white",
  },
});
