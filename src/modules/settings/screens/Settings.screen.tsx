import styled from "@emotion/native";
import { t } from "@lingui/core/macro";
import { useRouter } from "expo-router";

import { ScaledButton } from "#design-system/components/Button/Button";
import { Setting } from "#modules/settings/components/Setting";
import { SafePageTemplate } from "#modules/templates/components/PageTemplate";
import { Divider } from "#shared/components/Divider";
import { TopRightGradient } from "#shared/components/gradients/TopRightGradient";
import { PageTitleWithBack } from "#shared/components/PageTitleWithBack";
import { isFeatureEnabled } from "#shared/env/featureFlags";
import {
  useMMKVCustomTheme,
  useMMKVTheme,
  useMMKVUnits,
} from "#shared/mmkv/useMMKV";

export const Settings = () => {
  const { isImperialEnabled, setIsImperialEnabled } = useMMKVUnits();
  const { isCustomThemeEnabled, setIsCustomThemeEnabled } =
    useMMKVCustomTheme();
  const { theme, setTheme } = useMMKVTheme();

  return (
    <SafePageTemplate>
      <TopRightGradient />
      <PageTitleWithBack title={t`Settings`} />
      {isFeatureEnabled("CHEATCODES_ENABLED") && (
        <>
          <CheatcodesButton />
          <Divider />
        </>
      )}
      <Setting
        label={t`Units`}
        value={isImperialEnabled}
        onToggleValue={() => setIsImperialEnabled(!isImperialEnabled)}
        leftChoice={t`Metric`}
        rightChoice={t`Imperial`}
      />
      <Divider />
      <Setting
        label={t`Theme mode`}
        value={!!isCustomThemeEnabled}
        onToggleValue={() => setIsCustomThemeEnabled(!isCustomThemeEnabled)}
        leftChoice={t`System`}
        rightChoice={t`Custom`}
      />
      <Divider />
      <Setting
        label={t`Theme choice`}
        value={theme === "light"}
        onToggleValue={() => setTheme(theme === "dark" ? "light" : "dark")}
        leftChoice={t`Dark`}
        rightChoice={t`Light`}
        disabled={!isCustomThemeEnabled}
      />
      <Divider />
    </SafePageTemplate>
  );
};

const CheatcodesButton = () => {
  const router = useRouter();

  return (
    <ButtonContainer>
      <ScaledButton
        title="Cheatcodes"
        onPress={() => router.navigate("/settings/cheatcodes")}
      />
    </ButtonContainer>
  );
};

const ButtonContainer = styled.View(({ theme }) => ({
  padding: theme.spacings.m,
  justifyContent: "center",
  alignItems: "center",
}));
