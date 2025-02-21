import styled from "@emotion/native";
import { Image } from "expo-image";

import { Typography } from "#shared/fonts/Typography";

import logo from "../assets/logo.png";

export const Logo = () => {
  return (
    <Container>
      <Typography variant="title" text="RIDE" />
      <LogoImage source={logo} />
      <Typography variant="title" text="TODAY" />
    </Container>
  );
};

const Container = styled.View(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing.s,
  padding: theme.spacing.m,
}));

const LogoImage = styled(Image)({
  width: 40,
  height: 40,
});
