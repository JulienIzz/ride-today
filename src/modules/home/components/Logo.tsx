import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

import { Typography } from "#shared/fonts/Typography";

export const Logo = () => {
  const theme = useTheme();
  const { _ } = useLingui();

  return (
    <TagLine
      color={theme.colors.neutral[0]}
      variant="tagline"
      text={_(msg`RIDE TODAY`)}
    />
  );
};

const TagLine = styled(Typography)({
  width: "100%",
  textAlign: "center",
});
