import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { t } from "@lingui/core/macro";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import { Dimensions, View } from "react-native";
import { useMMKVBoolean } from "react-native-mmkv";

import { TextSwitch } from "#design-system/components/Switch/TextSwitch";
import { absoluteFillStyle } from "#design-system/utils/absoluteFillStyle";
import { PageTemplate } from "#modules/templates/components/PageTemplate";
import { PageTitleWithBack } from "#shared/components/PageTitleWithBack";
import { Typography } from "#shared/fonts/Typography";
import { storage, StorageKeys } from "#shared/mmkv/store";

export const Settings = () => {
  const [isImperialEnabled, setIsImperialEnabled] = useMMKVBoolean(
    StorageKeys.IS_IMPERIAL_ENABLED,
    storage,
  );

  return (
    <PageTemplate>
      <TopRightGradient />
      <PageTitleWithBack title={t`Settings`} />
      <Setting
        label="Units"
        value={!isImperialEnabled}
        onToggleValue={() => setIsImperialEnabled(!isImperialEnabled)}
        leftChoice={t`Metric`}
        rightChoice={t`Imperial`}
      />
    </PageTemplate>
  );
};

const Setting = ({
  label,
  value,
  onToggleValue,
  leftChoice,
  rightChoice,
}: {
  label: string;
  value: boolean;
  onToggleValue: () => void;
  leftChoice: string;
  rightChoice: string;
}) => {
  const theme = useTheme();

  return (
    <SettingContainer>
      <Typography
        variant="bodyBold"
        color={theme.colors.contrastLight}
        text={label}
      />
      <View>
        <TextSwitch
          value={value}
          onPress={onToggleValue}
          leftText={leftChoice}
          rightText={rightChoice}
        />
      </View>
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

const SettingContainer = styled.View({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 16,
});
