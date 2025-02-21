import styled from "@emotion/native";
import { useState } from "react";

import { GeolocationToggle } from "#modules/location/components/GeolocationToggle";
import { LocationDisplay } from "#modules/location/components/LocationDisplay";
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
        // TODO: handle location with hook instead of hardcode
        // do it in deidcated component which call location hook and then locationDisplay with coords
        <LocationDisplay location="Massy" />
      ) : (
        <SearchedLocation />
      )}
    </Container>
  );
};

const Container = styled.View(({ theme }) => ({
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacings.s,
}));
