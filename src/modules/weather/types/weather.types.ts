export interface Weather {
  location: Location;
  current: Current;
  forecast: Forecast;
}

interface Current {
  tempC: number;
  tempF: number;
  isDay: number;
  condition: Condition;
  windMph: number;
  windKph: number;
  precipMm: number;
  precipIn: number;
  humidity: number;
  cloud: number;
  feelslikeC: number;
  feelslikeF: number;
}

interface Condition {
  text: string;
  icon: string;
  code: number;
}

interface Location {
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
  day: Day;
  hour: Hour[];
}

export interface Day {
  maxTempC: number;
  maxTempF: number;
  minTempC: number;
  minTempF: number;
  avgTempC: number;
  avgTempF: number;
  maxWindMph: number;
  maxWindKph: number;
  totalPrecipMm: number;
  totalPrecipIn: number;
  totalSnowCm: number;
  avgHumidity: number;
  dailyWillItRain: number;
  dailyChanceOfRain: number;
  dailyWillItSnow: number;
  dailyChanceOfSnow: number;
  condition: Condition;
}

export interface Hour {
  time: string;
  tempC: number;
  tempF: number;
  isDay: number;
  condition: Condition;
  windMph: number;
  windKph: number;
  precipMm: number;
  precipIn: number;
  snowCm: number;
  humidity: number;
  cloud: number;
  feelslikeC: number;
  feelslikeF: number;
  willItRain: number;
  chanceOfRain: number;
  willItSnow: number;
  chanceOfSnow: number;
}
