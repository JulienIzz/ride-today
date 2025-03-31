import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { t } from "@lingui/core/macro";
import { openURL } from "expo-linking";

import { Link as LinkTypo, Typography } from "#shared/fonts/Typography";

export const RightInfos = () => {
  const theme = useTheme();

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
        text={t`© 2025 Julien Izzillo. All Rights Reserved.`}
      />
    </Container>
  );
};

const Container = styled.View(({ theme }) => ({
  alignItems: "center",
  gap: theme.spacings.s,
}));
