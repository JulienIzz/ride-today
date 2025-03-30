import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { t } from "@lingui/core/macro";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import { useRouter } from "expo-router";
import { Dimensions } from "react-native";

import { ScaledButton } from "#design-system/components/Button/Button";
import { absoluteFillStyle } from "#design-system/utils/absoluteFillStyle";
import { Setting } from "#modules/settings/components/Setting";
import { SafePageTemplate } from "#modules/templates/components/PageTemplate";
import { Divider } from "#shared/components/Divider";
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

const TopRightGradient = () => {
  const { width, height } = Dimensions.get("screen");
  const theme = useTheme();
  return (
    <Canvas style={absoluteFillStyle}>
      <Rect opacity={0.2} x={0} y={0} width={width} height={height}>
        <LinearGradient
          start={vec(width, 0)}
          end={vec(width - 250, 100)}
          colors={[theme.colors.primary, "transparent"]}
        />
      </Rect>
    </Canvas>
  );
};

const ButtonContainer = styled.View(({ theme }) => ({
  padding: theme.spacings.m,
  justifyContent: "center",
  alignItems: "center",
}));
