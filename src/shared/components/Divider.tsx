import styled from "@emotion/native";

export const Divider = styled.View(({ theme }) => ({
  height: 1,
  width: "100%",
  backgroundColor: theme.colors.contrastLight,
  opacity: 0.2,
}));
