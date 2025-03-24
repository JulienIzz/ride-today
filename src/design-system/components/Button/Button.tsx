import styled from "@emotion/native";
import { ActivityIndicator, type PressableProps } from "react-native";

import { ScaledPressable } from "#design-system/components/Button/ScaledPressable";
import { Typography } from "#shared/fonts/Typography";

type ButtonProps = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
} & PressableProps;

export const Button = ({
  title,
  onPress,
  disabled,
  loading,
  ...props
}: ButtonProps) => {
  if (loading) {
    return (
      <Container disabled={disabled} {...props}>
        <ActivityIndicator color="white" />
      </Container>
    );
  }

  return (
    <Container onPress={onPress} disabled={disabled} {...props}>
      <Typography text={title} bold variant="P1" />
    </Container>
  );
};

export const ScaledButton = ({
  title,
  onPress,
  disabled,
  loading,
  ...props
}: ButtonProps) => {
  return (
    <ScaledPressable onPress={disabled ? undefined : onPress}>
      <Button title={title} loading={loading} disabled={disabled} {...props} />
    </ScaledPressable>
  );
};

const Container = styled.Pressable(({ theme, disabled }) => ({
  width: 200,
  backgroundColor: disabled ? theme.colors.disabled : theme.colors.primary,
  padding: theme.spacings.s,
  borderRadius: theme.borderRadius.round,
  alignItems: "center",
  justifyContent: "center",
}));
