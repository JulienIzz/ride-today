import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { t } from "@lingui/core/macro";
import { Link } from "expo-router";
import { Fragment } from "react";
import Animated, { FadeIn, FadeInDown, FadeOut } from "react-native-reanimated";

import { absoluteFillStyle } from "#design-system/utils/absoluteFillStyle";
import { Divider } from "#shared/components/Divider";
import { Typography } from "#shared/fonts/Typography";

const menuItems = [
  { label: t`Settings`, link: "settings" },
  { label: t`About`, link: "about" },
] satisfies { link: string; label: string }[];

interface MenuModalProps {
  closeMenu: () => void;
}

export const MenuModal = ({ closeMenu }: MenuModalProps) => {
  const theme = useTheme();

  return (
    <Container
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
      style={absoluteFillStyle}
    >
      <BackgroundOpacity style={absoluteFillStyle} onPress={closeMenu} />
      <ModalContainer
        entering={FadeInDown.duration(300)}
        exiting={FadeOut.duration(300)}
      >
        {menuItems.map((item, index) => (
          <Fragment key={item.link}>
            <Link href={`/${item.link}`} asChild>
              <MenuItem onPress={closeMenu}>
                <Typography
                  variant="body"
                  color={theme.colors.contrastLight}
                  text={item.label}
                />
              </MenuItem>
            </Link>
            {index !== menuItems.length - 1 && <Divider />}
          </Fragment>
        ))}
      </ModalContainer>
    </Container>
  );
};

const Container = styled(Animated.View)(({ theme }) => ({
  justifyContent: "flex-end",
  alignItems: "center",
  paddingBottom: 100,
  padding: theme.spacings.xl,
}));

const ModalContainer = styled(Animated.View)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.colors.componentBackground,
  borderRadius: theme.borderRadius.xl,
  alignItems: "center",
}));

const BackgroundOpacity = styled.Pressable({
  backgroundColor: "black",
  opacity: 0.5,
});

const MenuItem = styled.TouchableOpacity(({ theme }) => ({
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacings.l,
}));
