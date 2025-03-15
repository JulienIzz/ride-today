import type { WeatherDto } from "#modules/weather/types/weather.dto.types";
import type { Weather } from "#modules/weather/types/weather.types";

export const adaptWeather = (currentWeatherDto: WeatherDto): Weather => {
  return {
    location: {
      name: currentWeatherDto.location.name,
      region: currentWeatherDto.location.region,
      country: currentWeatherDto.location.country,
      lat: currentWeatherDto.location.lat,
      lon: currentWeatherDto.location.lon,
      localTime: currentWeatherDto.location.localtime,
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
    forecast: {
      forecastday: currentWeatherDto.forecast.forecastday.map(
        (forecastDayDto) => ({
          date: forecastDayDto.date,
          day: {
            condition: {
              text: forecastDayDto.day.condition.text,
              icon: forecastDayDto.day.condition.icon,
              code: forecastDayDto.day.condition.code,
            },
            maxTempC: forecastDayDto.day.maxtemp_c,
            maxTempF: forecastDayDto.day.maxtemp_f,
            minTempC: forecastDayDto.day.mintemp_c,
            minTempF: forecastDayDto.day.mintemp_f,
            avgTempC: forecastDayDto.day.avgtemp_c,
            avgTempF: forecastDayDto.day.avgtemp_f,
            maxWindMph: forecastDayDto.day.maxwind_mph,
            maxWindKph: forecastDayDto.day.maxwind_kph,
            totalPrecipMm: forecastDayDto.day.totalprecip_mm,
            totalPrecipIn: forecastDayDto.day.totalprecip_in,
            totalSnowCm: forecastDayDto.day.totalsnow_cm,
            avgHumidity: forecastDayDto.day.avghumidity,
            dailyWillItSnow: forecastDayDto.day.daily_will_it_snow,
            dailyChanceOfSnow: forecastDayDto.day.daily_chance_of_snow,
            dailyWillItRain: forecastDayDto.day.daily_will_it_rain,
            dailyChanceOfRain: forecastDayDto.day.daily_chance_of_rain,
          },
          hour: forecastDayDto.hour.map((hourDto) => ({
            time: hourDto.time,
            tempC: hourDto.temp_c,
            tempF: hourDto.temp_f,
            isDay: hourDto.is_day,
            condition: {
              text: hourDto.condition.text,
              icon: hourDto.condition.icon,
              code: hourDto.condition.code,
            },
            windMph: hourDto.wind_mph,
            windKph: hourDto.wind_kph,
            precipMm: hourDto.precip_mm,
            precipIn: hourDto.precip_in,
            humidity: hourDto.humidity,
            cloud: hourDto.cloud,
            feelslikeC: hourDto.feelslike_c,
            feelslikeF: hourDto.feelslike_f,
            snowCm: hourDto.snow_cm,
            willItRain: hourDto.will_it_rain,
            chanceOfRain: hourDto.chance_of_rain,
            willItSnow: hourDto.will_it_snow,
            chanceOfSnow: hourDto.chance_of_snow,
          })),
        }),
      ),
    },
  };
};
