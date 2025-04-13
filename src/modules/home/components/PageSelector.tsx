import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { ChartSpline, Cog, ThermometerSun } from "lucide-react-native";

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
          size={24}
          color={
            selectedPage === 0 ? theme.colors.primary : theme.colors.inactive
          }
        />
      </IconContainer>
      <IconContainer
        onPress={() => {
          setPage(1);
        }}
      >
        <ChartSpline
          size={24}
          color={
            selectedPage === 1 ? theme.colors.primary : theme.colors.inactive
          }
        />
      </IconContainer>
      <IconContainer
        onPress={() => {
          setPage(2);
        }}
      >
        <Cog
          size={24}
          color={
            selectedPage === 2 ? theme.colors.primary : theme.colors.inactive
          }
        />
      </IconContainer>
    </Icons>
  );
};

const Icons = styled.View(({ theme }) => {
  return {
    flexDirection: "row",
    backgroundColor: theme.colors.background.component,
    borderRadius: theme.borderRadius.round,
    boxShadow: shadowStyle,
    paddingHorizontal: theme.spacings.s,
  };
});

const IconContainer = styled.Pressable(({ theme }) => ({
  padding: theme.spacings.m,
  justifyContent: "flex-start",
  alignItems: "center",
}));
