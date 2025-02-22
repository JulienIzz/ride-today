import { useSuspenseQuery } from "@tanstack/react-query";

import { fetchWeather } from "#modules/weather/api/weather.api";
import { adaptWeather } from "#modules/weather/interfaces/weather.adapter";

const weatherQueryKey = (location: string) => ["location", location];

export const useWeather = (location: string) => {
  const { data } = useSuspenseQuery({
    queryKey: weatherQueryKey(location),
    queryFn: () => fetchWeather(location),
  });

  const adaptedData = adaptWeather(data);

  const currentWeather = adaptedData.current;
  const forecastWeather = adaptedData.forecast;
  const currentLocation = adaptedData.location;

  return { currentWeather, forecastWeather, currentLocation };
};
