import { i18n } from "@lingui/core";
import { useSuspenseQuery } from "@tanstack/react-query";

import { fetchWeather } from "#modules/weather/api/weather.api";
import { adaptWeather } from "#modules/weather/interfaces/weather.adapter";

const weatherQueryKey = (location: string, locale: string = "en") => [
  "location",
  location,
  locale,
];

export const useWeather = (location: string) => {
  const localeCode = i18n.locale;

  const { data, ...queryStates } = useSuspenseQuery({
    queryKey: weatherQueryKey(location, localeCode),
    queryFn: () => fetchWeather(location, localeCode),
  });

  const adaptedData = adaptWeather(data);

  const currentWeather = adaptedData.current;
  const forecastWeather = adaptedData.forecast;
  const currentLocation = adaptedData.location;

  return { currentWeather, forecastWeather, currentLocation, queryStates };
};
