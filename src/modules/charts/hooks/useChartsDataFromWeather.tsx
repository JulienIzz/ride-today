import { useTheme } from "@emotion/react";
import type { lineDataItem } from "react-native-gifted-charts";

import { useWeather } from "#modules/weather/hooks/useCurrentWeather.query";
import { formatToDisplayHour } from "#modules/weather/utils/formatToDisplayHour";
import { Typography } from "#shared/fonts/Typography";

export const useChartsDataFromWeather = (location: string) => {
  const theme = useTheme();

  const { forecastWeather, currentLocation } = useWeather(location);

  const todayHoursForecast = forecastWeather.forecastday[0]?.hour ?? [];
  const tomorrowHoursForecast = forecastWeather.forecastday[1]?.hour ?? [];

  const localDate = new Date(currentLocation.localTime);

  const now = formatToDisplayHour(localDate);

  const today: lineDataItem[] = todayHoursForecast.map((hour) => {
    const label = formatToDisplayHour(new Date(hour.time));
    return {
      label,
      value: hour.condition.notation,
      labelComponent: () => (
        <Typography
          text={label === "0h" ? "" : label}
          color={theme.colors.contrastLight}
          variant="P1"
        />
      ),
      showStrip: label === now,
      hideDataPoint: label !== now,
      verticalLineUptoDataPoint: true,
      verticalLineColor: theme.colors.contrastLight,
      stripStrokeDashArray: [4, 4],
    };
  });

  const tomorrow: lineDataItem[] = tomorrowHoursForecast.map((hour) => {
    const label = formatToDisplayHour(new Date(hour.time));
    return {
      label,
      value: hour.condition.notation,
      labelComponent: () => (
        <Typography
          text={label === "0h" ? "" : label}
          color={theme.colors.contrastLight}
          variant="P1"
        />
      ),
      hideDataPoint: true,
    };
  });

  return { today, tomorrow, localDate };
};
