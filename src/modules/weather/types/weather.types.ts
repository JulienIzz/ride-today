export interface CurrentWeather {
  location: Location;
  current: Current;
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
}
