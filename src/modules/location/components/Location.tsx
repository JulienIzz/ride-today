import styled from "@emotion/native";
import { useState } from "react";

import { DeviceLocation } from "#modules/location/components/DeviceLocation";
import { GeolocationToggle } from "#modules/location/components/GeolocationToggle";
import { SearchedLocation } from "#modules/location/components/SearchedLocation";
import { useLocationStore } from "#modules/location/hooks/useLocationStore.hook";

export const Location = () => {
  const [isLocationEnabled, setLocationEnabled] = useState(false);
  const clearLocation = useLocationStore((state) => state.clearLocation);

  const handleSwitch = () => {
    clearLocation();
    setLocationEnabled(!isLocationEnabled);
  };

  return (
    <Container>
      <GeolocationToggle
        isLocationEnabled={isLocationEnabled}
        handleSwitch={handleSwitch}
      />
      {isLocationEnabled ? <DeviceLocation /> : <SearchedLocation />}
    </Container>
  );
};

const Container = styled.View(({ theme }) => ({
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacings.s,
}));
