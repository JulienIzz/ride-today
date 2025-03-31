import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { t } from "@lingui/core/macro";
import { Linking } from "react-native";

import { FlexView } from "#design-system/utils/FlexView";
import { SafePageTemplate } from "#modules/templates/components/PageTemplate";
import { TopRightGradient } from "#shared/components/gradients/TopRightGradient";
import { PageTitleWithBack } from "#shared/components/PageTitleWithBack";
import { Link, Typography } from "#shared/fonts/Typography";

export const Credits = () => {
  const theme = useTheme();

  return (
    <SafePageTemplate>
      <TopRightGradient />
      <PageTitleWithBack title={t`Credits`} />
      <InfoContainer>
        <Typography
          variant="H3"
          bold
          color={theme.colors.contrastLight}
          text={t`Development`}
        />
        <Typography
          variant="P1"
          color={theme.colors.contrastLight}
          text={"Julien IZZILLO"}
        />
        <Typography
          variant="H3"
          bold
          color={theme.colors.contrastLight}
          text={t`Design`}
        />
        <Typography
          variant="P1"
          color={theme.colors.contrastLight}
          text={"Yolaine BOURREAU"}
        />
        <Typography
          variant="H3"
          bold
          color={theme.colors.contrastLight}
          text={t`Third party services`}
        />
        <Link
          variant="P1"
          onPress={() => Linking.openURL("https://www.weatherapi.com/")}
          color={theme.colors.contrastLight}
          text={"WeatherAPI.com"}
        />
        <Link
          variant="P1"
          onPress={() => Linking.openURL("https://lucide.dev/")}
          color={theme.colors.contrastLight}
          text={"Lucide Icons"}
        />
      </InfoContainer>
      <RightInfos>
        <Typography
          variant="P1"
          color={theme.colors.inactive}
          text={t`© 2025 Julien Izzillo. All Rights Reserved.`}
        />
      </RightInfos>
    </SafePageTemplate>
  );
};

const RightInfos = styled(FlexView)(({ theme }) => ({
  justifyContent: "flex-end",
  alignItems: "center",
  padding: theme.spacings.m,
}));

const InfoContainer = styled(FlexView)(({ theme }) => ({
  padding: theme.spacings.m,
  gap: theme.spacings.s,
}));
