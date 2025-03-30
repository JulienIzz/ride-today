import { useEffect } from "react";
import { BackHandler } from "react-native";

import { MenuModal } from "#modules/modal/modals/MenuModal";
import { OnboardingModal } from "#modules/modal/modals/OnboardingModal";
import { RideScoreModal } from "#modules/modal/modals/RideScoreModal";
import { useGlobalModal, useGlobalModalActions } from "#modules/modal/useModal";

export const GlobalModal = () => {
  const { hideModal } = useGlobalModalActions();
  const { isVisible } = useGlobalModal();

  useEffect(() => {
    const backAction = () => {
      if (isVisible) {
        hideModal();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, [hideModal, isVisible]);

  return (
    <>
      <RideScoreModal />
      <OnboardingModal />
      <MenuModal />
    </>
  );
};
