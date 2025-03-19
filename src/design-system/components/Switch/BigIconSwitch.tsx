import styled from "@emotion/native";
import type { ViewStyle } from "react-native";
import { Pressable, View } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type BigIconSwitchProps = {
  value: boolean;
  onPress: () => void;
  trackStyle?: {
    width: number;
    height: number;
    padding: number;
  };
  containerStyle?: Omit<ViewStyle, "height" | "width" | "padding">;
  duration?: number;
  trackColors?: { right: string; left: string };
  leftIcon: React.JSX.Element;
  rightIcon: React.JSX.Element;
};

export const BigIconSwitch = ({
  value,
  onPress,
  trackStyle = {
    width: 120,
    height: 60,
    padding: 5,
  },
  containerStyle,
  duration = 300,
  trackColors = { right: "grey", left: "grey" },
  leftIcon,
  rightIcon,
}: BigIconSwitchProps) => {
  const numberedValue = value ? 1 : 0;
  const height = useSharedValue(0);
  const width = useSharedValue(0);

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      numberedValue,
      [0, 1],
      [trackColors.left, trackColors.right],
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
      [0, width.get() / 2],
    );
    const translateValue = withTiming(moveValue, { duration });

    return {
      transform: [{ translateX: translateValue }],
      borderRadius: height.get() / 2,
      width: width.get() / 2 - trackStyle.padding * 2,
    };
  });

  return (
    <View>
      <Pressable onPress={onPress}>
        <Track
          onLayout={(e) => {
            height.value = e.nativeEvent.layout.height;
            width.value = e.nativeEvent.layout.width;
          }}
          style={[trackStyle, containerStyle, trackAnimatedStyle]}
        >
          <Thumb style={thumbAnimatedStyle}></Thumb>
        </Track>
        <LeftIcon>{leftIcon}</LeftIcon>
        <RightIcon>{rightIcon}</RightIcon>
      </Pressable>
    </View>
  );
};

const LeftIcon = styled.View({
  width: "50%",
  position: "absolute",
  left: 0,
  top: 0,
  bottom: 0,
  justifyContent: "center",
  alignItems: "center",
});

const RightIcon = styled.View({
  width: "50%",
  position: "absolute",
  right: 0,
  top: 0,
  bottom: 0,
  justifyContent: "center",
  alignItems: "center",
});

const Thumb = styled(Animated.View)(({ theme }) => ({
  height: "100%",
  backgroundColor: theme.colors.primary,
}));

const Track = styled(Animated.View)(({ theme }) => ({
  backgroundColor: theme.colors.componentBackground,
}));
