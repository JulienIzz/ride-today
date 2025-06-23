import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import type { ColorValue, TextProps, TextStyle } from "react-native";

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

type Props = {
  variant: "tagline" | "P1" | "P2" | "P3" | "P4" | "H1" | "H2" | "H3" | "H4";
  text: string;
  contrast?: boolean;
  style?: TextStyle;
  color?: ColorValue;
  bold?: boolean;
  center?: boolean;
} & TextProps;

export const Typography = ({ variant, text, ...props }: Props) => {
  const theme = useTheme();

  switch (variant) {
    case "tagline":
      return <Tagline {...props}>{text}</Tagline>;
    case "P1":
      return (
        <Text fontSize={theme.fontSizes.m} {...props}>
          {text}
        </Text>
      );
    case "P2":
      return (
        <Text fontSize={theme.fontSizes.s} {...props}>
          {text}
        </Text>
      );
    case "P3":
      return (
        <Text fontSize={theme.fontSizes.xs} {...props}>
          {text}
        </Text>
      );
    case "P4":
      return (
        <Text fontSize={theme.fontSizes["2xs"]} {...props}>
          {text}
        </Text>
      );
    case "H1":
      return (
        <Text fontSize={theme.fontSizes["3xl"]} {...props}>
          {text}
        </Text>
      );
    case "H2":
      return (
        <Text fontSize={theme.fontSizes["2xl"]} {...props}>
          {text}
        </Text>
      );
    case "H3":
      return (
        <Text fontSize={theme.fontSizes.xl} {...props}>
          {text}
        </Text>
      );
    case "H4":
      return (
        <Text fontSize={theme.fontSizes.l} {...props}>
          {text}
        </Text>
      );
  }
};
export const Link = (props: Props) => {
  const theme = useTheme();

  return <Typography {...props} color={theme.colors.link} />;
};
