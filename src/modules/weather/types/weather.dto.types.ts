export interface WeatherDto {
  location: LocationDto;
  current: CurrentDto;
  forecast: ForecastDto;
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

export interface ForecastDto {
  forecastday: ForecastDayDto[];
}

export interface ForecastDayDto {
  date: Date;
  date_epoch: number;
  day: DayDto;
  hour: HourDto[];
}

export interface DayDto {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  totalsnow_cm: number;
  avghumidity: number;
  daily_will_it_rain: number;
  daily_chance_of_rain: number;
  daily_will_it_snow: number;
  daily_chance_of_snow: number;
  condition: ConditionDto;
}

export interface HourDto {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: ConditionDto;
  wind_mph: number;
  wind_kph: number;
  precip_mm: number;
  precip_in: number;
  snow_cm: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  will_it_rain: number;
  chance_of_rain: number;
  will_it_snow: number;
  chance_of_snow: number;
}
