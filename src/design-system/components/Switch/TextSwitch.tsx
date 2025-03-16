import styled from "@emotion/native";
import { Pressable, View } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { Typography } from "#shared/fonts/Typography";

type TextSwitchProps = {
  value: boolean;
  onPress: () => void;
  style?: {
    width: number;
    height: number;
    padding: number;
  };
  duration?: number;
  trackColors?: { right: string; left: string };
  leftText: string;
  rightText: string;
};

export const TextSwitch = ({
  value,
  onPress,
  style = {
    width: 200,
    height: 30,
    padding: 5,
  },
  duration = 300,
  trackColors = { right: "grey", left: "grey" },
  leftText,
  rightText,
}: TextSwitchProps) => {
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
      width: width.get() / 2 - style.padding * 2,
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
          style={[style, trackAnimatedStyle]}
        >
          <Thumb style={thumbAnimatedStyle} />
          <LeftView>
            <Typography variant={value ? "body" : "bodyBold"} text={leftText} />
          </LeftView>
          <RightView>
            <Typography
              variant={value ? "bodyBold" : "body"}
              text={rightText}
            />
          </RightView>
        </Track>
      </Pressable>
    </View>
  );
};

const LeftView = styled.View({
  width: "50%",
  position: "absolute",
  left: 0,
  top: 0,
  bottom: 0,
  justifyContent: "center",
  alignItems: "center",
});

const RightView = styled.View({
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
  width: 100,
  height: 40,
  padding: 5,
  backgroundColor: theme.colors.componentBackground,
}));
