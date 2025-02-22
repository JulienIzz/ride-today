import type { WeatherDto } from "#modules/weather/types/weather.dto.types";
import { weatherApiHttpClient } from "#shared/infra/httpClients/weatherApiHttpClient";

export const fetchWeather = async (location: string) => {
  const response = await weatherApiHttpClient.get<WeatherDto>(
    "/forecast.json",
    {
      params: {
        q: location,
        aqi: "no",
      },
    },
  );

  return response.data;
};
