import styled from "@emotion/native";
import { useTheme } from "@emotion/react";

import { appEnv } from "#shared/env/appEnv";
import { Typography } from "#shared/fonts/Typography";

export const DebugInfos = () => {
  const theme = useTheme();

  return (
    <Container>
      <Typography
        variant="P1"
        color={theme.colors.inactive}
        text={"Version " + appEnv.version}
      />
    </Container>
  );
};

const Container = styled.View(({ theme }) => ({
  alignItems: "center",
  gap: theme.spacings.s,
}));
