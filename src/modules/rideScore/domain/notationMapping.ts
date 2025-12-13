/**
 * Weather condition code to ride score notation mapping.
 *
 * These codes come from the Weather API and represent different weather conditions.
 * The notation value (0-5) indicates how suitable each condition is for riding:
 *   0 = Worst (dangerous: blizzard, heavy snow)
 *   1 = Very bad (snow, freezing rain)
 *   2 = Bad (fog, thunderstorm, moderate rain)
 *   3 = Moderate (light rain, drizzle, mist)
 *   4 = Good (not used as base, achieved via temperature modifier)
 *   5 = Best (clear, partly cloudy, cloudy, overcast)
 *
 * @see https://www.weatherapi.com/docs/weather_conditions.json for condition codes
 */
export const conditionNotations = [
  // Clear / Cloudy conditions - best for riding
  { code: 1000, notation: 5 }, // Sunny / Clear
  { code: 1003, notation: 5 }, // Partly cloudy
  { code: 1006, notation: 5 }, // Cloudy
  { code: 1009, notation: 5 }, // Overcast

  // Mist / Light precipitation - moderate
  { code: 1030, notation: 3 }, // Mist
  { code: 1063, notation: 3 }, // Patchy rain possible
  { code: 1066, notation: 1 }, // Patchy snow possible
  { code: 1069, notation: 1 }, // Patchy sleet possible
  { code: 1072, notation: 1 }, // Patchy freezing drizzle possible

  // Thunderstorm
  { code: 1087, notation: 2 }, // Thundery outbreaks possible

  // Snow / Blizzard - dangerous
  { code: 1114, notation: 0 }, // Blowing snow
  { code: 1117, notation: 1 }, // Blizzard

  // Fog
  { code: 1135, notation: 2 }, // Fog
  { code: 1147, notation: 1 }, // Freezing fog

  // Drizzle
  { code: 1150, notation: 3 }, // Patchy light drizzle
  { code: 1153, notation: 3 }, // Light drizzle
  { code: 1168, notation: 1 }, // Freezing drizzle
  { code: 1171, notation: 0 }, // Heavy freezing drizzle

  // Rain
  { code: 1180, notation: 3 }, // Patchy light rain
  { code: 1183, notation: 3 }, // Light rain
  { code: 1186, notation: 3 }, // Moderate rain at times
  { code: 1189, notation: 3 }, // Moderate rain
  { code: 1192, notation: 2 }, // Heavy rain at times
  { code: 1195, notation: 1 }, // Heavy rain
  { code: 1198, notation: 1 }, // Light freezing rain
  { code: 1201, notation: 1 }, // Moderate or heavy freezing rain

  // Sleet
  { code: 1204, notation: 2 }, // Light sleet
  { code: 1207, notation: 1 }, // Moderate or heavy sleet

  // Snow
  { code: 1210, notation: 1 }, // Patchy light snow
  { code: 1213, notation: 0 }, // Light snow
  { code: 1216, notation: 0 }, // Patchy moderate snow
  { code: 1219, notation: 0 }, // Moderate snow
  { code: 1222, notation: 0 }, // Patchy heavy snow
  { code: 1225, notation: 0 }, // Heavy snow
  { code: 1237, notation: 0 }, // Ice pellets

  // Rain showers
  { code: 1240, notation: 3 }, // Light rain shower
  { code: 1243, notation: 2 }, // Moderate or heavy rain shower
  { code: 1246, notation: 1 }, // Torrential rain shower

  // Sleet / Snow showers
  { code: 1249, notation: 0 }, // Light sleet showers
  { code: 1252, notation: 1 }, // Moderate or heavy sleet showers
  { code: 1255, notation: 0 }, // Light snow showers
  { code: 1258, notation: 0 }, // Moderate or heavy snow showers
  { code: 1261, notation: 0 }, // Light showers of ice pellets
  { code: 1264, notation: 0 }, // Moderate or heavy showers of ice pellets

  // Thunderstorm with precipitation
  { code: 1273, notation: 2 }, // Patchy light rain with thunder
  { code: 1276, notation: 1 }, // Moderate or heavy rain with thunder
  { code: 1279, notation: 1 }, // Patchy light snow with thunder
  { code: 1282, notation: 0 }, // Moderate or heavy snow with thunder
];
