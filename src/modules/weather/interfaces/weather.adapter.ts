import type { CurrentWeatherDto } from "#modules/weather/types/weather.dto.types";
import type { CurrentWeather } from "#modules/weather/types/weather.types";

export const adaptCurrentWeather = (
  currentWeatherDto: CurrentWeatherDto,
): CurrentWeather => {
  return {
    location: {
      name: currentWeatherDto.location.name,
      region: currentWeatherDto.location.region,
      country: currentWeatherDto.location.country,
      lat: currentWeatherDto.location.lat,
      lon: currentWeatherDto.location.lon,
    },
    current: {
      tempC: currentWeatherDto.current.temp_c,
      tempF: currentWeatherDto.current.temp_f,
      isDay: currentWeatherDto.current.is_day,
      condition: {
        text: currentWeatherDto.current.condition.text,
        icon: currentWeatherDto.current.condition.icon,
        code: currentWeatherDto.current.condition.code,
      },
      windMph: currentWeatherDto.current.wind_mph,
      windKph: currentWeatherDto.current.wind_kph,
      precipMm: currentWeatherDto.current.precip_mm,
      precipIn: currentWeatherDto.current.precip_in,
      humidity: currentWeatherDto.current.humidity,
      cloud: currentWeatherDto.current.cloud,
      feelslikeC: currentWeatherDto.current.feelslike_c,
      feelslikeF: currentWeatherDto.current.feelslike_f,
    },
  };
};
