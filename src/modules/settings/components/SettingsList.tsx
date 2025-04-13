import styled from "@emotion/native";
import { t } from "@lingui/core/macro";
import { useRouter } from "expo-router";

import { ScaledButton } from "#design-system/components/Button/Button";
import { SectionList } from "#design-system/components/Sections/SectionList";
import { Setting } from "#modules/settings/components/Setting";
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
    <SectionList
      title={t`Settings`}
      childrens={[
        <Setting
          key={"Units"}
          label={t`Units`}
          value={isImperialEnabled}
          onToggleValue={() => setIsImperialEnabled(!isImperialEnabled)}
          leftChoice={t`Metric`}
          rightChoice={t`Imperial`}
        />,
        <Setting
          key={"Theme mode"}
          label={t`Theme mode`}
          value={!!isCustomThemeEnabled}
          onToggleValue={() => setIsCustomThemeEnabled(!isCustomThemeEnabled)}
          leftChoice={t`System`}
          rightChoice={t`Custom`}
        />,
        <Setting
          key={"Theme choice"}
          label={t`Theme`}
          value={theme === "light"}
          onToggleValue={() => setTheme(theme === "dark" ? "light" : "dark")}
          leftChoice={t`Dark`}
          rightChoice={t`Light`}
          disabled={!isCustomThemeEnabled}
        />,
      ]}
    />
  );
};

export const CheatcodesButton = () => {
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
