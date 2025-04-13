import styled from "@emotion/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BOTTOM_MENU_HEIGHT } from "#modules/home/utils/constants";

export const Spacer = styled.View<{
  size?: number;
  horizontal?: boolean;
  vertical?: boolean;
}>(({ size, horizontal, vertical }) => {
  if (size) {
    return {
      width: horizontal ? size : undefined,
      height: vertical ? size : undefined,
    };
  }

  return {
    flex: 1,
  };
});

export const SpacerBottomMenu = () => {
  const { bottom } = useSafeAreaInsets();

  return <Spacer size={BOTTOM_MENU_HEIGHT + bottom} vertical />;
};
