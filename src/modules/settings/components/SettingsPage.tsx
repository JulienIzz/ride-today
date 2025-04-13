import styled from "@emotion/native";
import { ScrollView } from "react-native";

import { FlexView } from "#design-system/utils/FlexView";
import { About } from "#modules/about/components/About";
import { BOTTOM_MENU_HEIGHT } from "#modules/home/utils/constants";
import { Settings } from "#modules/settings/components/SettingsList";
import { Spacer } from "#shared/components/Spacer";

export const SettingsPage = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Container>
        <Settings />
        <About />
        <Spacer size={BOTTOM_MENU_HEIGHT} vertical />
      </Container>
    </ScrollView>
  );
};

const Container = styled(FlexView)(({ theme }) => ({
  padding: theme.spacings.m,
  gap: theme.spacings.m,
}));
