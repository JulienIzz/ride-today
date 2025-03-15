import type { Hour } from "#modules/weather/types/weather.types";

export const filterOnlyNextHours = (hours: Hour[] | undefined) => {
  if (!hours) {
    return [];
  }

  const now = new Date();
  return hours.filter((hour) => new Date(hour.time) > now);
};
