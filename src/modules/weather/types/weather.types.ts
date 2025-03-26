import type { Units } from "#modules/weather/types/units.types";

export interface Weather {
  location: Location;
  current: Current;
  forecast: Forecast;
}

export interface Current {
  temp: Record<Units, number>;
  feelslike: Record<Units, string>;
  wind: Record<Units, string>;
  precip: Record<Units, string>;
  humidity: string;
  cloud: string;
  isDay: number;
  condition: Condition;
}

export type ConditionNotation = 0 | 1 | 2 | 3 | 4 | 5;

interface Condition {
  text: string;
  icon: string;
  code: number;
  notation: ConditionNotation | undefined;
}

export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  localTime: string;
}

export interface Forecast {
  forecastday: ForecastDay[];
}

export interface ForecastDay {
  date: Date;
  hour: Hour[];
}

export interface Hour {
  time: string;
  temp: Record<Units, string>;
  feelslike: Record<Units, string>;
  wind: Record<Units, string>;
  precip: Record<Units, string>;
  humidity: string;
  cloud: string;
  isDay: number;
  condition: Condition;
  chanceOfRain: string;
  chanceOfSnow: string;
}
