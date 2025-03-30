import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { Cog, X } from "lucide-react-native";
import Animated, { PinwheelIn } from "react-native-reanimated";

import { ScaledPressable } from "#design-system/components/Button/ScaledPressable";
import { useGlobalModal, useGlobalModalActions } from "#modules/modal/useModal";

export const MenuWheel = () => {
  const theme = useTheme();

  const { isVisible, modal } = useGlobalModal();

  const { showMenu, hideModal } = useGlobalModalActions();

  const isMenuVisible = isVisible && modal === "menu";
  const handleMenuPress = () => {
    if (isMenuVisible) {
      hideModal();
    } else {
      showMenu();
    }
  };

  return (
    <WheelContainer
      onPress={handleMenuPress}
      style={{
        backgroundColor: isMenuVisible
          ? theme.colors.contrast
          : theme.colors.primary,
      }}
    >
      {isMenuVisible ? (
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
  return {
    position: "absolute",
    padding: 20,
    borderRadius: theme.borderRadius.round,
    shadowColor: "black",
    shadowRadius: 8,
    shadowOpacity: 0.5,
    shadowOffset: { width: 4, height: 4 },
    elevation: 4,
  };
});
