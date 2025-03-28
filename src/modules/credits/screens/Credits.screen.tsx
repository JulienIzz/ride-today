import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { t } from "@lingui/core/macro";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import { Dimensions, Linking } from "react-native";

import { absoluteFillStyle } from "#design-system/utils/absoluteFillStyle";
import { FlexView } from "#design-system/utils/FlexView";
import { SafePageTemplate } from "#modules/templates/components/PageTemplate";
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
      </InfoContainer>
      <DebugInfos>
        <Typography
          variant="P1"
          color={theme.colors.inactive}
          text={t`© 2025 Julien Izzillo. All Rights Reserved.`}
        />
      </DebugInfos>
    </SafePageTemplate>
  );
};

const TopRightGradient = () => {
  const { width, height } = Dimensions.get("window");
  const theme = useTheme();
  return (
    <Canvas style={absoluteFillStyle}>
      <Rect opacity={0.2} x={0} y={0} width={width} height={height}>
        <LinearGradient
          start={vec(width, 0)}
          end={vec(width - 550, 100)}
          colors={[theme.colors.primary, "transparent"]}
        />
      </Rect>
    </Canvas>
  );
};

const DebugInfos = styled(FlexView)({
  justifyContent: "flex-end",
  alignItems: "center",
});

const InfoContainer = styled(FlexView)(({ theme }) => ({
  padding: theme.spacings.m,
  gap: theme.spacings.s,
}));
