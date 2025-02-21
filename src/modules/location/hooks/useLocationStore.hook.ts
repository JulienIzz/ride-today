import { create } from "zustand";

interface LocationStore {
  location: string | null;
  setLocation: (location: string) => void;
  clearLocation: () => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  location: null,
  setLocation: (location: string) => set({ location }),
  clearLocation: () => set({ location: null }),
}));
