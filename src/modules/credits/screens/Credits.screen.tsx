import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Linking } from "react-native";

import { FlexView } from "#design-system/utils/FlexView";
import { DebugInfos } from "#modules/about/components/DebugInfos";
import { RightInfos } from "#modules/about/components/RightInfos";
import { SafePageTemplate } from "#modules/templates/components/PageTemplate";
import { TopRightGradient } from "#shared/components/gradients/TopRightGradient";
import { PageTitleWithBack } from "#shared/components/PageTitleWithBack";
import { Spacer } from "#shared/components/Spacer";
import { Link, Typography } from "#shared/fonts/Typography";

export const Credits = () => {
  const theme = useTheme();
  const { _ } = useLingui();

  return (
    <SafePageTemplate>
      <TopRightGradient />
      <PageTitleWithBack title={_(msg`Credits`)} />
      <Container>
        <InfoContainer>
          <Typography
            variant="H3"
            bold
            color={theme.colors.neutral[0]}
            text={_(msg`Development`)}
          />
          <Typography
            variant="P1"
            color={theme.colors.neutral[0]}
            text={"Julien IZZILLO"}
          />
          <Typography
            variant="H3"
            bold
            color={theme.colors.neutral[0]}
            text={_(msg`Design`)}
          />
          <Typography
            variant="P1"
            color={theme.colors.neutral[0]}
            text={"Yolaine BOURREAU"}
          />
          <Typography
            variant="H3"
            bold
            color={theme.colors.neutral[0]}
            text={_(msg`Third party services`)}
          />
          <Link
            variant="P1"
            onPress={() => Linking.openURL("https://www.weatherapi.com/")}
            color={theme.colors.neutral[0]}
            text={"WeatherAPI.com"}
          />
          <Link
            variant="P1"
            onPress={() => Linking.openURL("https://lucide.dev/")}
            color={theme.colors.neutral[0]}
            text={"Lucide Icons"}
          />
          <Spacer vertical />
          <DebugInfos />
          <RightInfos />
        </InfoContainer>
      </Container>
    </SafePageTemplate>
  );
};

const Container = styled(FlexView)(({ theme }) => ({
  paddingBottom: theme.spacings.m,
}));

const InfoContainer = styled(FlexView)(({ theme }) => ({
  padding: theme.spacings.m,
  gap: theme.spacings.s,
}));
