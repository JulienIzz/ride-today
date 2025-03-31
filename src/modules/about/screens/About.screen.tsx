import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { t } from "@lingui/core/macro";
import { useRouter } from "expo-router";

import { FlexView } from "#design-system/utils/FlexView";
import { useGlobalModalActions } from "#modules/modal/useModal";
import { SafePageTemplate } from "#modules/templates/components/PageTemplate";
import { Divider } from "#shared/components/Divider";
import { TopRightGradient } from "#shared/components/gradients/TopRightGradient";
import { PageTitleWithBack } from "#shared/components/PageTitleWithBack";
import { appEnv } from "#shared/env/appEnv";
import { Typography } from "#shared/fonts/Typography";

export const About = () => {
  const theme = useTheme();
  const router = useRouter();

  const { showOnboarding } = useGlobalModalActions();

  return (
    <SafePageTemplate>
      <Container>
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
      </Container>
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

const Container = styled(FlexView)(({ theme }) => ({
  paddingBottom: theme.spacings.m,
}));

const SectionContainer = styled.TouchableOpacity(({ theme }) => ({
  padding: theme.spacings.l,
}));

const DebugInfos = styled(FlexView)({
  justifyContent: "flex-end",
  alignItems: "center",
});
