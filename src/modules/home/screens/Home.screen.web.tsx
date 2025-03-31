import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { t } from "@lingui/core/macro";
import { Image } from "expo-image";
import type { ImageSourcePropType } from "react-native";
import { ScrollView } from "react-native";

import { FlexView } from "#design-system/utils/FlexView";
import { Logo } from "#modules/home/components/Logo";
import { PageTemplate } from "#modules/templates/components/PageTemplate";
import { TopRightGradientSmall } from "#shared/components/gradients/TopRightGradient";
import { Typography } from "#shared/fonts/Typography";

import appStore from "../assets/web/appStore.png";
import playStore from "../assets/web/playStore.png";
import firstAsset from "../assets/web/web1.png";
import secondAsset from "../assets/web/web2.png";
import thirdAsset from "../assets/web/web3.png";

const centeredStyle = {
  alignItems: "center",
} as const;

export const Home = () => {
  const theme = useTheme();

  return (
    <PageTemplate>
      <TopRightGradientSmall />
      <ScrollView contentContainerStyle={centeredStyle}>
        <CenterContainer>
          <Logo />
          <Description
            variant="P1"
            text={t`RideToday is your go-to riding companion, offering a straightforward score to gauge if today’s weather is biker-friendly. No need to sift through endless forecasts—this app provides clear, concise insights to help you decide whether to hit the road or stay put.`}
            color={theme.colors.contrastLight}
          />
          <Description
            variant="P1"
            text={t`Plan your rides a day or two in advance and experience the freedom of the open road with RideToday by your side.`}
            color={theme.colors.contrastLight}
          />
          <PreviewImages
            images={[
              { source: firstAsset, variant: "left" },
              { source: secondAsset, variant: "center" },
              { source: thirdAsset, variant: "right" },
            ]}
          />
          <Row>
            <StoreImage source={appStore} />
            <StoreImage source={playStore} />
          </Row>
          <RightInfos>
            <Typography
              variant="P1"
              color={theme.colors.inactive}
              text={t`© 2025 Julien Izzillo. All Rights Reserved.`}
            />
          </RightInfos>
        </CenterContainer>
      </ScrollView>
    </PageTemplate>
  );
};

const PreviewImages = ({
  images,
}: {
  images: Array<{
    source: ImageSourcePropType;
    variant: "left" | "center" | "right";
  }>;
}) => {
  return (
    <ImagesContainer>
      {images.map((img, index) => (
        <PreviewImage key={index} source={img.source} variant={img.variant} />
      ))}
    </ImagesContainer>
  );
};

const CenterContainer = styled(FlexView)(({ theme }) => ({
  alignItems: "center",
  maxWidth: 500,
  padding: theme.spacings.l,
  gap: theme.spacings.xl,
}));

const Description = styled(Typography)({
  textAlign: "justify",
});

const ImagesContainer = styled.View({
  height: 500,
});

const PreviewImage = styled(Image)<{ variant: "left" | "center" | "right" }>(({
  theme,
  variant,
}) => {
  let transformX = 0;
  if (variant === "left") transformX = -250;
  if (variant === "right") transformX = 250;

  return {
    position: "absolute",
    left: -115, // center anchor
    width: 230,
    height: 500,
    borderRadius: theme.spacings.m,
    resizeMode: "contain",
    transform: [{ translateX: transformX }],
  };
});

const Row = styled.View(({ theme }) => ({
  gap: theme.spacings.m,
}));

const RightInfos = styled.View({
  justifyContent: "flex-end",
  alignItems: "center",
});

const StoreImage = styled(Image)({
  width: 200,
  height: 50,
  resizeMode: "contain",
  alignItems: "flex-end",
});
