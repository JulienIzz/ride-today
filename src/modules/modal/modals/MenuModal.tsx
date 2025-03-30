import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { t } from "@lingui/core/macro";
import { Link } from "expo-router";
import { Fragment } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BOTTOM_MENU_HEIGHT } from "#modules/home/utils/constants";
import { Modal } from "#modules/modal/Modal";
import { useGlobalModal, useGlobalModalActions } from "#modules/modal/useModal";
import { Divider } from "#shared/components/Divider";
import { Typography } from "#shared/fonts/Typography";

export const MenuModal = () => {
  const theme = useTheme();

  const { isVisible, modal } = useGlobalModal();

  const { hideModal } = useGlobalModalActions();

  const isModalVisible = isVisible && modal === "menu";

  const menuItems = [
    { label: t`Settings`, link: "settings" },
    { label: t`About`, link: "about" },
  ] satisfies { link: string; label: string }[];

  if (!isModalVisible) return null;

  return (
    <Modal>
      <ModalContainer>
        {menuItems.map((item, index) => (
          <Fragment key={item.link}>
            <Link href={`/${item.link}`} asChild>
              <MenuItem onPress={hideModal}>
                <Typography
                  variant="P1"
                  bold
                  color={theme.colors.contrastLight}
                  text={item.label}
                />
              </MenuItem>
            </Link>
            {index !== menuItems.length - 1 && <Divider />}
          </Fragment>
        ))}
      </ModalContainer>
    </Modal>
  );
};

const ModalContainer = styled.View(({ theme }) => {
  const { bottom } = useSafeAreaInsets();

  return {
    width: "80%",
    backgroundColor: theme.colors.componentBackground,
    borderRadius: theme.borderRadius.m,
    alignItems: "center",
    position: "absolute",
    bottom: BOTTOM_MENU_HEIGHT + bottom + theme.spacings.xl,
  };
});

const MenuItem = styled.TouchableOpacity(({ theme }) => ({
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacings.l,
}));
