import * as Location from "expo-location";
import { useEffect, useState } from "react";

export const useLocation = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );

  const [locationStatus, setLocationStatus] = useState<
    "loading" | "error" | "resolved"
  >("loading");

  useEffect(() => {
    async function getCurrentLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationStatus("error");
        return;
      }

      setLocation(await Location.getCurrentPositionAsync({}));
      setLocationStatus("resolved");
    }

    void getCurrentLocation();
  }, []);

  return {
    isLoading: locationStatus === "loading",
    isError: locationStatus === "error",
    location,
  };
};
