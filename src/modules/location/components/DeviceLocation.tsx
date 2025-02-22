import { useEffect } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";

import { LocationDisplay } from "#modules/location/components/LocationDisplay";
import { useDeviceGeolocation } from "#modules/location/hooks/useDeviceGeolocation.hook";
import { useLocationStore } from "#modules/location/hooks/useLocationStore.hook";

export const DeviceLocation = () => {
  const { locationString } = useDeviceGeolocation();
  const setLocation = useLocationStore((state) => state.setLocation);

  useEffect(() => {
    setLocation(locationString);
  }, [locationString, setLocation]);

  return (
    <Animated.View entering={FadeInDown}>
      <LocationDisplay />
    </Animated.View>
  );
};
