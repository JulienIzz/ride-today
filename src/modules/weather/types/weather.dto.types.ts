export interface CurrentWeatherDto {
  location: LocationDto;
  current: CurrentDto;
}

interface CurrentDto {
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: ConditionDto;
  wind_mph: number;
  wind_kph: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
}

interface ConditionDto {
  text: string;
  icon: string;
  code: number;
}

interface LocationDto {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}
