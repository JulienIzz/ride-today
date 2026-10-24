import styled from "@emotion/native";
import { ScrollView } from "react-native";

import { FlexView } from "#design-system/utils/FlexView";
import { About } from "#modules/about/components/About";
import {
  CheatcodesButton,
  Settings,
} from "#modules/settings/components/SettingsList";
import { SpacerBottomMenu } from "#shared/components/Spacer";
import { isFeatureEnabled } from "#shared/env/featureFlags";
import { useHorizontalSafePadding } from "#shared/hooks/useHorizontalSafePadding";

export const SettingsPage = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Container>
        <Settings />
        <About />
        {isFeatureEnabled("CHEATCODES_ENABLED") && <CheatcodesButton />}
        <SpacerBottomMenu />
      </Container>
    </ScrollView>
  );
};

const Container = styled(FlexView)(({ theme }) => ({
  padding: theme.spacings.m,
  ...useHorizontalSafePadding(theme.spacings.m),
  gap: theme.spacings.m,
}));
