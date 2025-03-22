import { Modal } from "#modules/modal/GlobalModal";
import { useGlobalModal } from "#modules/modal/useModal";

export const RideScoreModal = () => {
  const { isVisible, modal } = useGlobalModal();

  const isModalVisible = isVisible && modal === "rideScore";

  if (!isModalVisible) return null;

  return <Modal></Modal>;
};
