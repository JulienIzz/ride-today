import { create } from "zustand";

type Modal = "onboarding" | "menu" | undefined;

export type GlobalModalStore = {
  isVisible: boolean;
  modal: Modal;
  actions: {
    showOnboarding: () => void;
    showMenu: () => void;
    hideModal: () => void;
  };
};

export const useGlobalModalStore = create<GlobalModalStore>((set) => ({
  isVisible: false,
  modal: undefined,
  actions: {
    showOnboarding: () => set({ isVisible: true, modal: "onboarding" }),
    showMenu: () => set({ isVisible: true, modal: "menu" }),
    hideModal: () => set({ isVisible: false, modal: undefined }),
  },
}));

export const useGlobalModal = () => {
  const isVisible = useGlobalModalStore((state) => state.isVisible);
  const modal = useGlobalModalStore((state) => state.modal);

  return {
    isVisible,
    modal,
  };
};

export const useGlobalModalActions = () =>
  useGlobalModalStore((state) => state.actions);
