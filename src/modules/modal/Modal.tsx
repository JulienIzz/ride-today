import styled from "@emotion/native";
import type { PropsWithChildren } from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import { absoluteFillStyle } from "#design-system/utils/absoluteFillStyle";
import { useGlobalModalActions } from "#modules/modal/useModal";

export const Modal = ({ children }: PropsWithChildren) => {
  const { hideModal } = useGlobalModalActions();
  return (
    <ModalContainer
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
    >
      <BackgroundOpacity onPress={hideModal} />
      {children}
    </ModalContainer>
  );
};

const ModalContainer = styled(Animated.View)(({ theme }) => ({
  ...absoluteFillStyle,
  padding: theme.spacings.l,
  justifyContent: "center",
  alignItems: "center",
}));

const BackgroundOpacity = styled.Pressable({
  ...absoluteFillStyle,
  backgroundColor: "black",
  opacity: 0.5,
});
