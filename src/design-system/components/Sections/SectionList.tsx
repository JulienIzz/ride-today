import styled from "@emotion/native";
import { Fragment } from "react";
import { View } from "react-native";

import { absoluteFillStyle } from "#design-system/utils/absoluteFillStyle";
import { Divider } from "#shared/components/Divider";
import { Typography } from "#shared/fonts/Typography";
import { shadowStyle } from "#shared/styling/shadowStyle";

export const SectionList = ({
  title,
  childrens,
}: {
  title: string;
  childrens: React.ReactNode[];
}) => {
  return (
    <View>
      <TitleContainer>
        <Typography variant="P1" bold contrast text={title} />
      </TitleContainer>
      <SectionsContainer>
        <BackgroundOpacity />
        {childrens.map((child, index) => (
          <Fragment key={index}>
            {child}
            {index !== childrens.length - 1 && <Divider />}
          </Fragment>
        ))}
      </SectionsContainer>
    </View>
  );
};

const TitleContainer = styled.View(({ theme }) => ({
  padding: theme.spacings.m,
  borderRadius: theme.borderRadius.m,
}));

const SectionsContainer = styled.View(({ theme }) => ({
  padding: theme.spacings.m,
  gap: theme.spacings.m,
}));

const BackgroundOpacity = styled.View(({ theme }) => ({
  ...absoluteFillStyle,
  backgroundColor: theme.colors.background.component,
  borderRadius: theme.borderRadius.m,
  boxShadow: shadowStyle,
  opacity: 0.85,
}));
