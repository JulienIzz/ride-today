import { useEffect } from "react";
import { BackHandler } from "react-native";

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

    // isVisible is not a dependency because we don't want to re-add
    // the event listener each time the modal is shown/hidden
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hideModal]);

  return (
    <>
      <RideScoreModal />
      <OnboardingModal />
    </>
  );
};
