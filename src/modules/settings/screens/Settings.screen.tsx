import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { t } from "@lingui/core/macro";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import { Dimensions, View } from "react-native";

import { ContentSwitch } from "#design-system/components/Switch/ContentSwitch";
import { absoluteFillStyle } from "#design-system/utils/absoluteFillStyle";
import { PageTemplate } from "#modules/templates/components/PageTemplate";
import { Divider } from "#shared/components/Divider";
import { PageTitleWithBack } from "#shared/components/PageTitleWithBack";
import { Typography } from "#shared/fonts/Typography";
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
    <PageTemplate>
      <TopRightGradient />
      <PageTitleWithBack title={t`Settings`} />
      <Setting
        label={t`Units`}
        value={!isImperialEnabled}
        onToggleValue={() => setIsImperialEnabled(!isImperialEnabled)}
        leftChoice={t`Metric`}
        rightChoice={t`Imperial`}
      />
      <Divider />
      <Setting
        label={t`Dark/Light theme`}
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
    </PageTemplate>
  );
};

const Setting = ({
  label,
  value,
  onToggleValue,
  leftChoice,
  rightChoice,
  disabled,
}: {
  label: string;
  value: boolean;
  onToggleValue: () => void;
  leftChoice: string;
  rightChoice: string;
  disabled?: boolean;
}) => {
  const theme = useTheme();

  const trackStyle = {
    width: 200,
    height: 40,
    padding: 5,
  };

  return (
    <SettingContainer>
      <Typography
        variant="P1"
        bold
        color={theme.colors.contrastLight}
        text={label}
      />
      <View>
        <ContentSwitch
          value={value}
          onPress={onToggleValue}
          trackStyle={trackStyle}
          leftComponent={
            <Typography variant="P1" bold={!value} text={leftChoice} />
          }
          rightComponent={
            <Typography variant="P1" bold={value} text={rightChoice} />
          }
        />
      </View>
      {disabled && <DisabledView style={absoluteFillStyle} />}
    </SettingContainer>
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
          end={vec(width - 250, 100)}
          colors={[theme.colors.primary, "transparent"]}
        />
      </Rect>
    </Canvas>
  );
};

const SettingContainer = styled.Pressable({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 16,
});

const DisabledView = styled.View(({ theme }) => ({
  ...absoluteFillStyle,
  backgroundColor: theme.colors.disabled,
  opacity: 0.5,
}));
