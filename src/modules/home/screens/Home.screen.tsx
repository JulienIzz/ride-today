import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import { Cog, X } from "lucide-react-native";
import { useState } from "react";
import { Dimensions } from "react-native";
import Animated, { PinwheelIn } from "react-native-reanimated";

import { ScaledPressable } from "#design-system/components/Button/ScaledPressable";
import { absoluteFillStyle } from "#design-system/utils/absoluteFillStyle";
import { Logo } from "#modules/home/components/Logo";
import { MenuModal } from "#modules/home/components/MenuModal";
import { Location } from "#modules/location/components/Location";
import { PageTemplate } from "#modules/templates/components/PageTemplate";
import { Weather } from "#modules/weather/components/Weather";

export const Home = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  return (
    <PageTemplate>
      <TopLeftGradient />
      <BottomRightGradient />
      <Logo />
      <Location />
      <Weather />
      {isMenuOpened && <MenuModal closeMenu={() => setIsMenuOpened(false)} />}
      <MenuWheel
        isMenuOpened={isMenuOpened}
        onPress={() => setIsMenuOpened(!isMenuOpened)}
      />
    </PageTemplate>
  );
};

const TopLeftGradient = () => {
  const { width, height } = Dimensions.get("window");
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
  const { width, height } = Dimensions.get("window");
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

const MenuWheel = ({
  isMenuOpened,
  onPress,
}: {
  isMenuOpened: boolean;
  onPress?: () => void;
}) => {
  const theme = useTheme();

  return (
    <WheelContainer
      onPress={onPress}
      style={{
        backgroundColor: isMenuOpened
          ? theme.colors.contrast
          : theme.colors.primary,
      }}
    >
      {isMenuOpened ? (
        <Animated.View entering={PinwheelIn}>
          <X strokeWidth={2} color={theme.colors.primary} size={32} />
        </Animated.View>
      ) : (
        <Cog strokeWidth={2} color={theme.colors.contrast} size={32} />
      )}
    </WheelContainer>
  );
};

const WheelContainer = styled(ScaledPressable)(({ theme }) => ({
  position: "absolute",
  bottom: 20,
  right: 20,
  padding: theme.spacings.m,
  borderRadius: theme.borderRadius.round,
  shadowColor: theme.colors.contrast,
  shadowRadius: 8,
  shadowOpacity: 0.5,
  shadowOffset: { width: 4, height: 4 },
}));
