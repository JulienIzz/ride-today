import styled from "@emotion/native";

const Text = styled.Text(({ theme }) => ({
  fontSize: theme.fontSizes.xs,
  fontFamily: theme.fonts.body,
  color: theme.colors.black,
}));

const Subtext = styled.Text(({ theme }) => ({
  fontSize: theme.fontSizes["2xs"],
  fontFamily: theme.fonts.body,
  color: theme.colors.black,
}));

const Title = styled.Text(({ theme }) => ({
  fontSize: theme.fontSizes.title,
  fontFamily: theme.fonts.title,
  color: theme.colors.black,
}));

type Props = {
  variant: "body" | "subtext" | "title";
  text: string;
};

export const Typography = ({ variant, text }: Props) => {
  switch (variant) {
    case "title":
      return <Title>{text}</Title>;
    case "body":
      return <Text>{text}</Text>;
    case "subtext":
      return <Subtext>{text}</Subtext>;
  }
};
