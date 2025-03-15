import styled from "@emotion/native";
import { t } from "@lingui/core/macro";
import { Moon, Sun } from "lucide-react-native";
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
  const { forecastWeather, currentLocation } = useWeather(location);

  const HoursWeather = filterOnlyNextHours({
    hours: forecastWeather.forecastday[0]?.hour,
    currentHour: new Date(currentLocation.localTime),
  });

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
        <IconAndText>
          {hour.isDay === 1 ? (
            <Sun color={"black"} size={16} />
          ) : (
            <Moon color={"black"} size={16} />
          )}
          <Typography
            variant="body"
            text={formatToDisplayHour(new Date(hour.time))}
          />
        </IconAndText>
        {conditionText ? (
          <Typography variant="body" text={conditionText} />
        ) : null}
        <Typography variant="body" text={t({ message: `${hour.tempC}°C` })} />
        <Typography
          variant="body"
          text={t({ message: `Wind : ${hour.windKph} km/h` })}
        />
      </LeftContainer>
      <RightContainer>
        <Typography
          variant="body"
          text={t({ message: `Cloud : ${hour.cloud}%` })}
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

const IconAndText = styled.View(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacings.xs,
}));
