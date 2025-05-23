import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import * as Application from "expo-application";

import { Typography } from "#shared/fonts/Typography";

export const DebugInfos = () => {
  const theme = useTheme();

  return (
    <Container>
      <Typography
        variant="P1"
        color={theme.colors.inactive}
        text={"Version " + Application.nativeApplicationVersion}
      />
    </Container>
  );
};

const Container = styled.View(({ theme }) => ({
  alignItems: "center",
  gap: theme.spacings.s,
}));
