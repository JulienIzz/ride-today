import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { t } from "@lingui/core/macro";

import { Typography } from "#shared/fonts/Typography";

export const Logo = () => {
  const theme = useTheme();

  return (
    <TagLine
      color={theme.colors.neutral[0]}
      variant="tagline"
      text={t`RIDE TODAY`}
    />
  );
};

const TagLine = styled(Typography)({
  width: "100%",
  textAlign: "center",
});
