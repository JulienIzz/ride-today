import styled from "@emotion/native";

export const Divider = styled.View(({ theme }) => ({
  height: 1,
  width: "100%",
  backgroundColor: theme.colors.neutral[0],
  opacity: 0.2,
}));

export const VerticalDivider = styled.View(({ theme }) => ({
  width: 1,
  height: "100%",
  backgroundColor: theme.colors.neutral[0],
  opacity: 0.2,
}));
