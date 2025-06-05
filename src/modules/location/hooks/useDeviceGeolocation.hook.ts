import { useSuspenseQuery } from "@tanstack/react-query";
import * as Location from "expo-location";

export const useDeviceGeolocation = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["user-location"],
    queryFn: async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      // If permission is not granted, throw an error
      if (status !== "granted") {
        throw new Error("Location permission not granted");
      }
      // If permission is granted, fetch the current position
      const currentPosition = await Location.getCurrentPositionAsync({});
      return currentPosition;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });

  const locationString = `${data.coords.latitude},${data.coords.longitude}`;

  return { locationString, location: data };
};
