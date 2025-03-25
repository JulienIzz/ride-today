import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { t } from "@lingui/core/macro";
import {
  CloudRain,
  Moon,
  MoonStar,
  Snowflake,
  Sun,
  Waves,
  Wind,
} from "lucide-react-native";
import { Fragment } from "react";

import { absoluteFillStyle } from "#design-system/utils/absoluteFillStyle";
import { FlexView } from "#design-system/utils/FlexView";
import { RideScoreMini } from "#modules/rideScore/components/RideScoreMini";
import { useWeather } from "#modules/weather/hooks/useCurrentWeather.query";
import { useUnitSystem } from "#modules/weather/hooks/useUnitSystem";
import type { Hour } from "#modules/weather/types/weather.types";
import { filterOnlyNextHours } from "#modules/weather/utils/filterOnlyNextHours";
import { formatToDisplayHour } from "#modules/weather/utils/formatToDisplayHour";
import { Divider } from "#shared/components/Divider";
import { Typography } from "#shared/fonts/Typography";
import { getConditionsTranslation } from "#shared/i18n/getConditionsTranslation";
import { QueryErrorBoundary } from "#shared/infra/boundaries/QueryBoundary";
import { shadowStyle } from "#shared/styling/shadowStyle";

export const ForecastWeather = ({
  location,
}: {
  location: string | undefined;
}) => {
  if (!location) {
    return null;
  }

  return (
    <FlexView>
      <QueryErrorBoundary>
        <Container>
          <Background style={absoluteFillStyle} />
          <ForecastWeatherData location={location} />
        </Container>
      </QueryErrorBoundary>
    </FlexView>
  );
};

export const ForecastWeatherData = ({ location }: { location: string }) => {
  const theme = useTheme();

  const { forecastWeather, currentLocation } = useWeather(location);

  const HoursWeather = filterOnlyNextHours({
    hours: forecastWeather.forecastday[0]?.hour,
    currentHour: new Date(currentLocation.localTime),
  });

  return (
    <FlexView>
      <ListHeaderContainer>
        <Typography
          variant="P1"
          color={theme.colors.contrastLight}
          bold
          text={t({ message: "Next hours" })}
        />
      </ListHeaderContainer>
      <Divider />
      <HoursContainer>
        {HoursWeather.map((hour, index) => (
          <Fragment key={index}>{renderHourWeather(hour)}</Fragment>
        ))}
        <EndOfDay />
      </HoursContainer>
    </FlexView>
  );
};

export const renderHourWeather = (hour: Hour) => {
  return (
    <Fragment>
      <HourWeather hour={hour} />
      <Divider />
    </Fragment>
  );
};

const HourWeather = ({ hour }: { hour: Hour }) => {
  const theme = useTheme();
  const conditionText = getConditionsTranslation(
    hour.condition.code,
    hour.isDay === 1,
  );

  const unitSystem = useUnitSystem();

  return (
    <HourContainer>
      <LeftContainer>
        <IconAndText>
          {hour.isDay === 1 ? (
            <Sun color={theme.colors.contrastLight} size={16} />
          ) : (
            <Moon color={theme.colors.contrastLight} size={16} />
          )}
          <Typography
            color={theme.colors.contrastLight}
            variant="P1"
            text={formatToDisplayHour(new Date(hour.time))}
          />
          <RideScoreMini score={hour.condition.notation} />
        </IconAndText>
        <Typography
          color={theme.colors.contrastLight}
          variant="P1"
          text={hour.temp[unitSystem]}
        />
        {conditionText ? (
          <Typography
            color={theme.colors.contrastLight}
            numberOfLines={2}
            variant="P1"
            text={conditionText}
          />
        ) : null}
      </LeftContainer>
      <RightContainer>
        <IconAndText>
          <Typography
            color={theme.colors.contrastLight}
            variant="P1"
            text={hour.wind[unitSystem]}
          />
          <Wind color={theme.colors.contrastLight} size={16} />
        </IconAndText>
        <IconAndText>
          <Typography
            color={theme.colors.contrastLight}
            variant="P1"
            text={hour.humidity}
          />
          <Waves color={theme.colors.contrastLight} size={16} />
        </IconAndText>
        <IconAndText>
          <Typography
            color={theme.colors.contrastLight}
            variant="P1"
            text={hour.chanceOfRain}
          />
          <CloudRain color={theme.colors.contrastLight} size={16} />
        </IconAndText>
        <IconAndText>
          <Typography
            color={theme.colors.contrastLight}
            variant="P1"
            text={hour.chanceOfSnow}
          />
          <Snowflake color={theme.colors.contrastLight} size={16} />
        </IconAndText>
      </RightContainer>
    </HourContainer>
  );
};

const EndOfDay = () => {
  const theme = useTheme();

  return (
    <EndOfDayContainer>
      <MoonStar size={40} strokeWidth={1} color={theme.colors.contrastLight} />
    </EndOfDayContainer>
  );
};

const Container = styled(FlexView)(({ theme }) => ({
  borderRadius: theme.borderRadius.m,
  boxShadow: shadowStyle,
}));

const HoursContainer = styled(FlexView)(({ theme }) => ({
  paddingHorizontal: theme.spacings.m,
}));

const ListHeaderContainer = styled.View(({ theme }) => ({
  paddingTop: theme.spacings.m,
  paddingHorizontal: theme.spacings.m,
  marginBottom: theme.spacings.s,
}));

const Background = styled.View(({ theme }) => ({
  borderRadius: theme.borderRadius.m,
  backgroundColor: theme.colors.componentBackground,
  opacity: 0.4,
}));

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
  gap: theme.spacings.s,
}));

const EndOfDayContainer = styled.View(({ theme }) => ({
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacings.l,
}));
