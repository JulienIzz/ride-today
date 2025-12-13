import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import type { ColorValue, TextProps, TextStyle } from "react-native";

import type { Theme } from "#design-system/theme/theme";

const Text = styled.Text<{
  fontSize: number;
  contrast?: boolean;
  color?: ColorValue;
  bold?: boolean;
  center?: boolean;
}>(({ theme, fontSize, color, contrast, bold, center }) => ({
  fontSize: fontSize,
  fontFamily: bold ? theme.fonts.semiBold : theme.fonts.regular,
  color:
    color ??
    (contrast ? theme.colors.neutral["0"] : theme.colors.neutral["100"]),
  textAlign: center ? "center" : undefined,
}));

const Tagline = styled.Text<{ color?: ColorValue; contrast?: boolean }>(
  ({ theme, color, contrast }) => ({
    fontSize: theme.fontSizes.tagline,
    fontFamily: theme.fonts.boldItalic,
    color:
      color ??
      (contrast ? theme.colors.neutral["0"] : theme.colors.neutral["100"]),
  }),
);

type TextVariant = "P1" | "P2" | "P3" | "P4" | "H1" | "H2" | "H3" | "H4";
type Variant = "tagline" | TextVariant;

const variantToFontSize: Record<TextVariant, keyof Theme["fontSizes"]> = {
  P1: "m",
  P2: "s",
  P3: "xs",
  P4: "2xs",
  H1: "3xl",
  H2: "2xl",
  H3: "xl",
  H4: "l",
};

type Props = {
  variant: Variant;
  text: string;
  contrast?: boolean;
  style?: TextStyle;
  color?: ColorValue;
  bold?: boolean;
  center?: boolean;
} & TextProps;

export const Typography = ({ variant, text, ...props }: Props) => {
  const theme = useTheme();

  if (variant === "tagline") {
    return <Tagline {...props}>{text}</Tagline>;
  }

  const fontSize = theme.fontSizes[variantToFontSize[variant]];

  return (
    <Text fontSize={fontSize} {...props}>
      {text}
    </Text>
  );
};
export const Link = (props: Props) => {
  const theme = useTheme();

  return <Typography {...props} color={theme.colors.link} />;
};
