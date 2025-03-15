import styled from "@emotion/native";
import type { ColorValue, TextStyle } from "react-native";

const Body = styled.Text<{ color?: ColorValue }>(({ theme, color }) => ({
  fontSize: theme.fontSizes.xs,
  fontFamily: theme.fonts.body,
  color: color ?? theme.colors.contrast,
}));

const BodyBold = styled.Text<{ color?: ColorValue }>(({ theme, color }) => ({
  fontSize: theme.fontSizes.xs,
  fontFamily: theme.fonts.bodyBold,
  color: color ?? theme.colors.contrast,
}));

const Subtext = styled.Text<{ color?: ColorValue }>(({ theme, color }) => ({
  fontSize: theme.fontSizes["2xs"],
  fontFamily: theme.fonts.body,
  color: color ?? theme.colors.contrast,
}));

const Title = styled.Text<{ color?: ColorValue }>(({ theme, color }) => ({
  fontSize: theme.fontSizes.title,
  fontFamily: theme.fonts.title,
  color: color ?? theme.colors.contrast,
}));

type Props = {
  variant: "body" | "bodyBold" | "subtext" | "title";
  text: string;
  style?: TextStyle;
  color?: ColorValue;
};

export const Typography = ({ variant, text, color, style }: Props) => {
  switch (variant) {
    case "title":
      return (
        <Title color={color} style={style}>
          {text}
        </Title>
      );
    case "body":
      return (
        <Body color={color} style={style}>
          {text}
        </Body>
      );
    case "bodyBold":
      return (
        <BodyBold color={color} style={style}>
          {text}
        </BodyBold>
      );
    case "subtext":
      return (
        <Subtext color={color} style={style}>
          {text}
        </Subtext>
      );
  }
};
