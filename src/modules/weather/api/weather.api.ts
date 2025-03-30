import type { WeatherDto } from "#modules/weather/types/weather.dto.types";
import { fallbackLanguageTag } from "#shared/i18n/I18n.provider";
import { weatherApiHttpClient } from "#shared/infra/httpClients/weatherApiHttpClient";

export const fetchWeather = async (
  location: string,
  locale: string = fallbackLanguageTag,
) => {
  const response = await weatherApiHttpClient.get<WeatherDto>(
    "/forecast.json",
    {
      params: {
        q: location,
        aqi: "no",
        lang: locale,
        days: 2,
      },
    },
  );

  return response.data;
};
