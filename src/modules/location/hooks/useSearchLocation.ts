import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { useLocationStore } from "#modules/location/hooks/useLocationStore.hook";

export const useSearchLocation = () => {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const setLocation = useLocationStore((state) => state.setLocation);

  const updateLocation = (value: string | undefined) => {
    if (!value || value === "") {
      setLocation(undefined);
      return;
    }

    setLocation(value);
  };

  const debouncedSetLocation = useDebouncedCallback(updateLocation, 500);

  const changeTextHandler = (value: string) => {
    setSearch(value);
    debouncedSetLocation(value);
  };

  return {
    search,
    changeTextHandler,
    updateLocation,
  };
};
