import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { t } from "@lingui/core/macro";

import { Typography } from "#shared/fonts/Typography";

export const Logo = () => {
  const theme = useTheme();

  return (
    <Container>
      <Typography
        color={theme.colors.contrastLight}
        variant="tagline"
        text={t`RIDE TODAY`}
      />
    </Container>
  );
};

const Container = styled.View(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacings.s,
  padding: theme.spacings.s,
}));
