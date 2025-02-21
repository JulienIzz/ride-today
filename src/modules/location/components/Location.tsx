import styled from "@emotion/native";
import { useState } from "react";

import { CurrentLocation } from "#modules/location/components/CurrentLocation";
import { GeolocationToggle } from "#modules/location/components/GeolocationToggle";
import { SearchedLocation } from "#modules/location/components/SearchedLocation";

export const Location = () => {
  const [isLocationEnabled, setLocationEnabled] = useState(false);
  const handleSwitch = () => setLocationEnabled(!isLocationEnabled);

  return (
    <Container>
      <GeolocationToggle
        isLocationEnabled={isLocationEnabled}
        handleSwitch={handleSwitch}
      />
      {isLocationEnabled ? (
        <CurrentLocation location="Massy" />
      ) : (
        <SearchedLocation />
      )}
    </Container>
  );
};

const Container = styled.View({
  alignItems: "center",
  justifyContent: "center",
  gap: 4,
});
