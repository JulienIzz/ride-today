import { useState } from "react";

import { Logo } from "#modules/home/components/Logo";
import { CurrentLocation } from "#modules/location/components/CurrentLocation";
import { GeolocationToggle } from "#modules/location/components/GeolocationToggle";
import { SearchedLocation } from "#modules/location/components/SearchedLocation";
import { PageTemplate } from "#modules/templates/components/PageTemplate";

export default function Index() {
  const [isLocationEnabled, setLocationEnabled] = useState(false);
  const handleSwitch = () => setLocationEnabled(!isLocationEnabled);

  return (
    <PageTemplate>
      <Logo />
      <GeolocationToggle
        isLocationEnabled={isLocationEnabled}
        handleSwitch={handleSwitch}
      />
      {isLocationEnabled ? (
        <CurrentLocation location="Massy" />
      ) : (
        <SearchedLocation />
      )}
    </PageTemplate>
  );
}
