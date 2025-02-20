import { useSuspenseQuery } from "@tanstack/react-query";

import { fetchCurrentWeather } from "#modules/weather/api/weather.api";
import { adaptCurrentWeather } from "#modules/weather/interfaces/weather.adapter";

const currentWeatherQueryKey = (location: string) => ["location", location];

export const useCurrentWeather = (location: string) => {
  const { data, isLoading, error } = useSuspenseQuery({
    queryKey: currentWeatherQueryKey(location),
    queryFn: () => fetchCurrentWeather(location),
  });

  const currentWeather = adaptCurrentWeather(data);

  return { currentWeather, isLoading, error };
};
