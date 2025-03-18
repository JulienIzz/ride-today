import type { WeatherDto } from "#modules/weather/types/weather.dto.types";
import type {
  ConditionNotation,
  Weather,
} from "#modules/weather/types/weather.types";
import { conditionNotations } from "#modules/weather/utils/notationMapping";

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
      temp: {
        metric: currentWeatherDto.current.temp_c,
        imperial: currentWeatherDto.current.temp_f,
      },
      feelslike: {
        metric: currentWeatherDto.current.feelslike_c + "°C",
        imperial: currentWeatherDto.current.feelslike_f + "°F",
      },
      condition: {
        text: currentWeatherDto.current.condition.text,
        icon: currentWeatherDto.current.condition.icon,
        code: currentWeatherDto.current.condition.code,
        notation: getConditionNotation(
          currentWeatherDto.current.condition.code,
          currentWeatherDto.current.is_day,
          currentWeatherDto.current.temp_c,
        ),
      },
      wind: {
        metric: currentWeatherDto.current.wind_kph + " km/h",
        imperial: currentWeatherDto.current.wind_mph + " mph",
      },
      precip: {
        metric: currentWeatherDto.current.precip_mm + " mm",
        imperial: currentWeatherDto.current.precip_in + " in",
      },
      humidity: currentWeatherDto.current.humidity + "%",
      cloud: currentWeatherDto.current.cloud + "%",
      isDay: currentWeatherDto.current.is_day,
    },
    forecast: {
      forecastday: currentWeatherDto.forecast.forecastday.map(
        (forecastDayDto) => ({
          date: forecastDayDto.date,
          hour: forecastDayDto.hour.map((hourDto) => ({
            time: hourDto.time,
            temp: {
              metric: hourDto.temp_c + "°C",
              imperial: hourDto.temp_f + "°F",
            },
            feelslike: {
              metric: hourDto.feelslike_c + "°C",
              imperial: hourDto.feelslike_f + "°F",
            },
            wind: {
              metric: hourDto.wind_kph + " km/h",
              imperial: hourDto.wind_mph + " mph",
            },
            precip: {
              metric: hourDto.precip_mm + " mm",
              imperial: hourDto.precip_in + " in",
            },
            humidity: hourDto.humidity + "%",
            cloud: hourDto.cloud + "%",
            isDay: hourDto.is_day,
            condition: {
              text: hourDto.condition.text,
              icon: hourDto.condition.icon,
              code: hourDto.condition.code,
              notation: getConditionNotation(
                hourDto.condition.code,
                hourDto.is_day,
                hourDto.temp_c,
              ),
            },
            chanceOfRain: hourDto.chance_of_rain + "%",
            chanceOfSnow: hourDto.chance_of_snow + "%",
          })),
        }),
      ),
    },
  };
};

const getConditionNotation = (
  code: number,
  isDay: number,
  tempInCelsius: number,
): ConditionNotation | undefined => {
  let temperatureModifier: number;

  if (tempInCelsius < -2) {
    temperatureModifier = -5;
  } else if (tempInCelsius < 2) {
    temperatureModifier = -4;
  } else if (tempInCelsius < 10) {
    temperatureModifier = -1;
  } else if (tempInCelsius < 30) {
    temperatureModifier = 0;
  } else {
    temperatureModifier = -1;
  }

  const notation = conditionNotations.find(
    (conditionNotation) => conditionNotation.code === code,
  )?.notation;

  if (notation === undefined) {
    return;
  }

  const modifiedNotation = notation + temperatureModifier;

  return Math.trunc(modifiedNotation / (isDay ? 1 : 2)) as ConditionNotation;
};
