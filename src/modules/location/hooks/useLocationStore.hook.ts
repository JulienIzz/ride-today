import { create } from "zustand";

interface LocationStore {
  location: string | undefined;
  setLocation: (location: string | undefined) => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  location: undefined,
  setLocation: (location) => set({ location }),
}));
