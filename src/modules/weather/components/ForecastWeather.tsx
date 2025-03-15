import styled from "@emotion/native";
import { t } from "@lingui/core/macro";
import { Fragment } from "react";
import { FlatList } from "react-native";

import { useWeather } from "#modules/weather/hooks/useCurrentWeather.query";
import type { Hour } from "#modules/weather/types/weather.types";
import { filterOnlyNextHours } from "#modules/weather/utils/filterOnlyNextHours";
import { formatToDisplayHour } from "#modules/weather/utils/formatToDisplayHour";
import { Divider } from "#shared/components/Divider";
import { Typography } from "#shared/fonts/Typography";
import { getConditionsTranslation } from "#shared/i18n/getConditionsTranslation";

export const ForecastWeather = ({ location }: { location: string | null }) => {
  if (!location) {
    return null;
  }

  return <ForecastWeatherData location={location} />;
};

export const ForecastWeatherData = ({ location }: { location: string }) => {
  const { forecastWeather } = useWeather(location);

  const HoursWeather = filterOnlyNextHours(
    forecastWeather.forecastday[0]?.hour,
  );

  const forecastLength = HoursWeather.length;

  return (
    <FlatList
      data={HoursWeather}
      renderItem={({ item: hour, index }) =>
        renderHourWeather(hour, forecastLength, index)
      }
    />
  );
};

export const renderHourWeather = (
  hour: Hour,
  forecastLength: number,
  index: number,
) => {
  return (
    <Fragment>
      <HourWeather hour={hour} />
      {index + 1 < forecastLength && <Divider />}
    </Fragment>
  );
};

const HourWeather = ({ hour }: { hour: Hour }) => {
  const conditionText = getConditionsTranslation(
    hour.condition.code,
    hour.isDay === 1,
  );

  return (
    <HourContainer>
      <LeftContainer>
        <Typography
          variant="body"
          text={`${formatToDisplayHour(new Date(hour.time))}`}
        />
        {conditionText ? (
          <Typography variant="body" text={conditionText} />
        ) : null}
        <Typography
          variant="body"
          text={t({ message: `Wind : ${hour.windKph} km/h` })}
        />
        <Typography
          variant="body"
          text={t({ message: `Cloud : ${hour.cloud}%` })}
        />
      </LeftContainer>
      <RightContainer>
        <Typography
          variant="body"
          text={
            hour.isDay === 1 ? t({ message: "Day" }) : t({ message: "Night" })
          }
        />
        <Typography
          variant="body"
          text={t({ message: `Humidity : ${hour.humidity}%` })}
        />
        <Typography
          variant="body"
          text={t({ message: `Rain : ${hour.chanceOfRain}%` })}
        />
        <Typography
          variant="body"
          text={t({ message: `Snow : ${hour.chanceOfSnow}%` })}
        />
      </RightContainer>
    </HourContainer>
  );
};

const HourContainer = styled.View(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  padding: theme.spacings.s,
}));

const LeftContainer = styled.View(({ theme }) => ({
  alignItems: "flex-start",
  gap: theme.spacings.xs,
}));

const RightContainer = styled.View(({ theme }) => ({
  alignItems: "flex-end",
  gap: theme.spacings.xs,
}));
