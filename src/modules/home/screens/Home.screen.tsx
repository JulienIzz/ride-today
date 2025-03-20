import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { Cog, X } from "lucide-react-native";
import { useState } from "react";
import Animated, { PinwheelIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ScaledPressable } from "#design-system/components/Button/ScaledPressable";
import { HomeGradients } from "#modules/home/components/HomeGradient";
import { Logo } from "#modules/home/components/Logo";
import { MenuModal } from "#modules/home/components/MenuModal";
import { Location } from "#modules/location/components/Location";
import { PageTemplate } from "#modules/templates/components/PageTemplate";
import { Weather } from "#modules/weather/components/Weather";

export const Home = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  return (
    <PageTemplate>
      <HomeGradients />
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

const WheelContainer = styled(ScaledPressable)(({ theme }) => {
  const { bottom } = useSafeAreaInsets();
  return {
    position: "absolute",
    bottom: 20 + bottom,
    right: 20,
    padding: theme.spacings.m,
    borderRadius: theme.borderRadius.round,
    shadowColor: "black",
    shadowRadius: 8,
    shadowOpacity: 0.5,
    shadowOffset: { width: 4, height: 4 },
    elevation: 4,
  };
});
