import { useEffect } from "react";
import { BackHandler } from "react-native";

import { OnboardingModal } from "#modules/modal/modals/OnboardingModal";
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

  return <OnboardingModal />;
};
