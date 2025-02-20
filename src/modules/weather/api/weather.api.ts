import type { CurrentWeatherDto } from "#modules/weather/types/weather.dto.types";
import { weatherApiHttpClient } from "#shared/infra/httpClients/weatherApiHttpClient";

export const fetchCurrentWeather = async (location: string) => {
  const response = await weatherApiHttpClient.get<CurrentWeatherDto>(
    "/current.json",
    {
      params: {
        q: location,
        aqi: "no",
      },
    },
  );

  return response.data;
};
