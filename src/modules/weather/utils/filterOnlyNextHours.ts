import type { Hour } from "#modules/weather/types/weather.types";

export const filterOnlyNextHours = ({
  hours,
  currentHour,
}: {
  hours: Hour[] | undefined;
  currentHour: Date;
}) => {
  if (!hours) {
    return [];
  }

  return hours.filter((hour) => new Date(hour.time) > currentHour);
};
