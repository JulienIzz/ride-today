import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { t } from "@lingui/core/macro";
import { View } from "react-native";
import { useMMKVBoolean } from "react-native-mmkv";

import { TextSwitch } from "#design-system/components/Switch/TextSwitch";
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

const SettingContainer = styled.View({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 16,
});
