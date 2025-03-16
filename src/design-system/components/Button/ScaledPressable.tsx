import type { ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export const ScaledPressable = ({
  children,
  onPress,
  style,
}: {
  children: React.JSX.Element;
  onPress?: () => void;
  style?: ViewStyle;
}) => {
  const scale = useSharedValue(1);

  const gesture = Gesture.Tap()
    .onTouchesDown(() => {
      scale.value = withTiming(0.9, { duration: 100 });
    })
    .onTouchesUp(() => {
      if (onPress) runOnJS(onPress)();
      scale.value = withTiming(1);
    })
    .onFinalize(() => {
      scale.value = withTiming(1);
    })
    .onTouchesCancelled(() => {
      scale.value = withTiming(1);
    });

  const buttonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[style, buttonStyle]}>{children}</Animated.View>
    </GestureDetector>
  );
};
