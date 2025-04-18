import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { useNavigation } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { View } from "react-native";

import { ScaledPressable } from "#design-system/components/Button/ScaledPressable";
import { Typography } from "#shared/fonts/Typography";

interface TitleProps {
  title: string;
}

export const PageTitleWithBack = ({ title }: TitleProps) => {
  const theme = useTheme();
  const { goBack } = useNavigation();
  return (
    <View>
      <TitleContainer>
        <BackContainer onPress={goBack}>
          <ChevronLeft color={theme.colors.neutral["100"]} size={24} />
        </BackContainer>
        <Typography
          variant="H1"
          bold
          color={theme.colors.neutral[0]}
          text={title}
        />
      </TitleContainer>
    </View>
  );
};

const TitleContainer = styled.View(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacings.l,
  gap: theme.spacings.m,
}));

const BackContainer = styled(ScaledPressable)(({ theme }) => ({
  position: "absolute",
  left: theme.spacings.l,
  padding: theme.spacings.s,
  borderRadius: theme.borderRadius.round,
  shadowColor: theme.colors.neutral["100"],
  shadowRadius: 8,
  shadowOpacity: 0.5,
  shadowOffset: { width: 4, height: 4 },
  backgroundColor: theme.colors.primary,
}));
