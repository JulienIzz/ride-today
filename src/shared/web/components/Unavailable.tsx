import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Link } from "expo-router";

import { PageTemplate } from "#modules/templates/components/PageTemplate";
import { Link as LinkTypo, Typography } from "#shared/fonts/Typography";

export const Unavailable = () => {
  const theme = useTheme();
  const { _ } = useLingui();
  return (
    <PageTemplate>
      <CenteredView>
        <Typography
          variant="H1"
          color={theme.colors.neutral[0]}
          bold
          text={_(msg`Page unavailable`)}
        />
        <Link href={"/"}>
          <LinkTypo
            variant="H3"
            color={theme.colors.neutral[0]}
            text={_(msg`Return to homepage`)}
          />
        </Link>
      </CenteredView>
    </PageTemplate>
  );
};

const CenteredView = styled.View({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  gap: 8,
});
