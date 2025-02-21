import styled from "@emotion/native";

const Text = styled.Text({
  fontSize: 24,
  fontFamily: "Montserrat_400Regular",
  color: "black",
});

const Subtext = styled.Text({
  fontSize: 16,
  fontFamily: "Montserrat_400Regular",
  color: "black",
});

const Title = styled.Text({
  fontSize: 40,
  fontFamily: "Montserrat_700Bold",
  color: "black",
});

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
