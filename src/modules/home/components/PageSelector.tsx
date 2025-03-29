import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { ChartSpline, ThermometerSun } from "lucide-react-native";

import { VerticalDivider } from "#shared/components/Divider";
import { shadowStyle } from "#shared/styling/shadowStyle";

export const PageSelector = ({
  selectedPage,
  setPage,
}: {
  selectedPage: number;
  setPage: (page: number) => void;
}) => {
  const theme = useTheme();

  return (
    <Icons>
      <IconContainer
        onPress={() => {
          setPage(0);
        }}
      >
        <ThermometerSun
          size={32}
          color={
            selectedPage === 0 ? theme.colors.primary : theme.colors.inactive
          }
        />
      </IconContainer>
      <VerticalDivider />
      <IconContainer
        onPress={() => {
          setPage(1);
        }}
      >
        <ChartSpline
          size={32}
          color={
            selectedPage === 1 ? theme.colors.primary : theme.colors.inactive
          }
        />
      </IconContainer>
    </Icons>
  );
};

const Icons = styled.View(({ theme }) => {
  return {
    flexDirection: "row",
    backgroundColor: theme.colors.componentBackground,
    borderRadius: theme.borderRadius.l,
    boxShadow: shadowStyle,
  };
});

const IconContainer = styled.Pressable(({ theme }) => ({
  paddingVertical: theme.spacings.m,
  paddingHorizontal: theme.spacings["2xl"],
  height: "100%",
  justifyContent: "flex-start",
  alignItems: "center",
}));
