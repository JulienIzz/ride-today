import { create } from "zustand";

interface LocationStore {
  location: string | undefined;
  isLocationEnabled: boolean;
  setLocation: (location: string | undefined) => void;
  toggleLocationEnabled: () => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  location: undefined,
  setLocation: (location) => set({ location }),
  isLocationEnabled: false,
  toggleLocationEnabled: () =>
    set((state) => ({
      isLocationEnabled: !state.isLocationEnabled,
    })),
}));
