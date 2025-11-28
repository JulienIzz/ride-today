import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { openURL } from "expo-linking";

import { Link as LinkTypo, Typography } from "#shared/fonts/Typography";

export const RightInfos = () => {
  const theme = useTheme();
  const { _ } = useLingui();

  return (
    <Container>
      <LinkTypo
        variant="P1"
        color={theme.colors.inactive}
        text={"contact@ride-today.com"}
        onPress={() => openURL("mailto:contact@ride-today.com")}
      />
      <Typography
        variant="P1"
        color={theme.colors.inactive}
        text={_(msg`© 2025 Julien Izzillo. All Rights Reserved.`)}
      />
    </Container>
  );
};

const Container = styled.View(({ theme }) => ({
  alignItems: "center",
  gap: theme.spacings.s,
}));
