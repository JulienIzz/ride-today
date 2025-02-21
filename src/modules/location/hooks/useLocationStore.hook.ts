import { create } from "zustand";

interface LocationStore {
  location: string;
  setLocation: (location: string) => void;
  clearLocation: () => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  location: "",
  setLocation: (location: string) => set({ location }),
  clearLocation: () => set({ location: "" }),
}));
