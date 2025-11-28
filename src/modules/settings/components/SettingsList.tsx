import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
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
  const { _ } = useLingui();
  const { isImperialEnabled, setIsImperialEnabled } = useMMKVUnits();
  const { isCustomThemeEnabled, setIsCustomThemeEnabled } =
    useMMKVCustomTheme();
  const { theme, setTheme } = useMMKVTheme();

  return (
    <SectionList
      title={_(msg`Settings`)}
      childrens={[
        <Setting
          key={"Units"}
          label={_(msg`Units`)}
          value={isImperialEnabled}
          onToggleValue={() => setIsImperialEnabled(!isImperialEnabled)}
          leftChoice={_(msg`Metric`)}
          rightChoice={_(msg`Imperial`)}
        />,
        <Setting
          key={"Theme mode"}
          label={_(msg`Theme mode`)}
          value={!!isCustomThemeEnabled}
          onToggleValue={() => setIsCustomThemeEnabled(!isCustomThemeEnabled)}
          leftChoice={_(msg`System`)}
          rightChoice={_(msg`Custom`)}
        />,
        <Setting
          key={"Theme choice"}
          label={_(msg`Theme`)}
          value={theme === "light"}
          onToggleValue={() => setTheme(theme === "dark" ? "light" : "dark")}
          leftChoice={_(msg`Dark`)}
          rightChoice={_(msg`Light`)}
          disabled={!isCustomThemeEnabled}
        />,
      ]}
    />
  );
};

export const CheatcodesButton = () => {
  const router = useRouter();

  return (
    <ScaledButton
      title="Cheatcodes"
      onPress={() => router.navigate("/settings/cheatcodes")}
    />
  );
};
