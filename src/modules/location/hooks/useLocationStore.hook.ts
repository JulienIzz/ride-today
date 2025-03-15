import { create } from "zustand";

interface LocationStore {
  location: string | null;
  searchedLocation: string | null;
  setLocation: (location: string) => void;
  setSearchedLocation: (location: string) => void;
  clearLocation: () => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  location: null,
  searchedLocation: null,
  setLocation: (location: string) => set({ location }),
  setSearchedLocation: (location: string) =>
    set({ searchedLocation: location }),
  clearLocation: () => set({ location: null }),
}));
