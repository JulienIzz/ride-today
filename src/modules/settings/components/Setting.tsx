import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { View } from "react-native";

import { ContentSwitch } from "#design-system/components/Switch/ContentSwitch";
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
    <SettingContainer disabled={disabled}>
      <Typography
        variant="P1"
        bold
        color={theme.colors.neutral[0]}
        text={label}
      />
      <View>
        <ContentSwitch
          value={value}
          onPress={disabled ? undefined : () => onToggleValue()}
          trackStyle={trackStyle}
          leftComponent={
            <Typography variant="P1" bold={!value} text={leftChoice} />
          }
          rightComponent={
            <Typography variant="P1" bold={value} text={rightChoice} />
          }
        />
      </View>
    </SettingContainer>
  );
};

const SettingContainer = styled.Pressable<{ disabled?: boolean }>(
  ({ disabled }) => ({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    opacity: disabled ? 0.5 : 1,
  }),
);
