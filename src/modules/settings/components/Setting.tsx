import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { View } from "react-native";

import { ContentSwitch } from "#design-system/components/Switch/ContentSwitch";
import { absoluteFillStyle } from "#design-system/utils/absoluteFillStyle";
import { Typography } from "#shared/fonts/Typography";

export const Setting = ({
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

const SettingContainer = styled.Pressable(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacings.m,
}));

const DisabledView = styled.View(({ theme }) => ({
  ...absoluteFillStyle,
  backgroundColor: theme.colors.disabled,
  opacity: 0.5,
}));
