import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { useNavigation } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { View } from "react-native";

import { ScaledPressable } from "#design-system/components/Button/ScaledPressable";
import { Divider } from "#shared/components/Divider";
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
          <ChevronLeft color={theme.colors.contrast} size={24} />
        </BackContainer>
        <Typography
          variant="H1"
          bold
          color={theme.colors.contrastLight}
          text={title}
        />
      </TitleContainer>
      <Divider />
    </View>
  );
};

const TitleContainer = styled.View(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacings.l,
  gap: theme.spacings.m,
}));

const BackContainer = styled(ScaledPressable)(({ theme }) => ({
  padding: theme.spacings.s,
  borderRadius: theme.borderRadius.round,
  shadowColor: theme.colors.contrast,
  shadowRadius: 8,
  shadowOpacity: 0.5,
  shadowOffset: { width: 4, height: 4 },
  backgroundColor: theme.colors.primary,
}));
