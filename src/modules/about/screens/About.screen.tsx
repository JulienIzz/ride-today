import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { t } from "@lingui/core/macro";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import { useRouter } from "expo-router";
import { Dimensions } from "react-native";

import { absoluteFillStyle } from "#design-system/utils/absoluteFillStyle";
import { FlexView } from "#design-system/utils/FlexView";
import { useGlobalModalActions } from "#modules/modal/useModal";
import { SafePageTemplate } from "#modules/templates/components/PageTemplate";
import { Divider } from "#shared/components/Divider";
import { PageTitleWithBack } from "#shared/components/PageTitleWithBack";
import { appEnv } from "#shared/env/appEnv";
import { Typography } from "#shared/fonts/Typography";

export const About = () => {
  const theme = useTheme();
  const router = useRouter();

  const { showOnboarding } = useGlobalModalActions();

  return (
    <SafePageTemplate>
      <TopRightGradient />
      <PageTitleWithBack title={t`About`} />
      <Section label={t`Privacy policy`} />
      <Section label={t`User prevention`} onPress={showOnboarding} />
      <Section
        label={t`Credits`}
        onPress={() => {
          router.navigate("/about/credits");
        }}
      />
      <DebugInfos>
        <Typography
          variant="P1"
          color={theme.colors.inactive}
          text={"Version " + appEnv.version}
        />
      </DebugInfos>
    </SafePageTemplate>
  );
};

const Section = ({
  label,
  onPress,
}: {
  label: string;
  onPress?: () => void;
}) => {
  const theme = useTheme();

  return (
    <>
      <SectionContainer onPress={onPress}>
        <Typography
          variant="H3"
          color={theme.colors.contrastLight}
          text={label}
        />
      </SectionContainer>
      <Divider />
    </>
  );
};

const TopRightGradient = () => {
  const { width, height } = Dimensions.get("screen");
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

const SectionContainer = styled.TouchableOpacity(({ theme }) => ({
  padding: theme.spacings.l,
}));

const DebugInfos = styled(FlexView)(({ theme }) => ({
  justifyContent: "flex-end",
  alignItems: "center",
  padding: theme.spacings.m,
}));
