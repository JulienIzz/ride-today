import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { t } from "@lingui/core/macro";
import { Moon, MoonStar, Sun } from "lucide-react-native";
import { Fragment } from "react";
import { FlatList, RefreshControl } from "react-native";

import { absoluteFillStyle } from "#design-system/utils/absoluteFillStyle";
import { FlexView } from "#design-system/utils/FlexView";
import { useWeather } from "#modules/weather/hooks/useCurrentWeather.query";
import { useUnitSystem } from "#modules/weather/hooks/useUnitSystem";
import type { Hour } from "#modules/weather/types/weather.types";
import { filterOnlyNextHours } from "#modules/weather/utils/filterOnlyNextHours";
import { formatToDisplayHour } from "#modules/weather/utils/formatToDisplayHour";
import { Divider } from "#shared/components/Divider";
import { Typography } from "#shared/fonts/Typography";
import { getConditionsTranslation } from "#shared/i18n/getConditionsTranslation";
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
    <Container>
      <Background style={absoluteFillStyle} />
      <ForecastWeatherData location={location} />
    </Container>
  );
};

export const ForecastWeatherData = ({ location }: { location: string }) => {
  const { forecastWeather, currentLocation, queryStates } =
    useWeather(location);

  const HoursWeather = filterOnlyNextHours({
    hours: forecastWeather.forecastday[0]?.hour,
    currentHour: new Date(currentLocation.localTime),
  });

  return (
    <ListContainer>
      <ListHeaderContainer>
        <ContrastLightTypography
          variant="P1"
          bold
          text={t({ message: "Next hours" })}
        />
      </ListHeaderContainer>
      <Divider />
      <HoursContainer>
        <FlatList
          data={HoursWeather}
          renderItem={({ item: hour }) => renderHourWeather(hour)}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<EndOfDay />}
          refreshControl={
            <RefreshControl
              refreshing={queryStates.isLoading}
              onRefresh={queryStates.refetch}
            />
          }
        />
      </HoursContainer>
    </ListContainer>
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
          <ContrastLightTypography
            variant="P1"
            text={formatToDisplayHour(new Date(hour.time))}
          />
        </IconAndText>
        {conditionText ? (
          <ContrastLightTypography variant="P1" text={conditionText} />
        ) : null}
        <ContrastLightTypography
          variant="P1"
          text={t({ message: `${hour.temp[unitSystem]}` })}
        />
        <ContrastLightTypography
          variant="P1"
          text={t({ message: `Wind : ${hour.wind[unitSystem]}` })}
        />
      </LeftContainer>
      <RightContainer>
        <ContrastLightTypography
          variant="P1"
          text={t({ message: `Cloud : ${hour.cloud}` })}
        />
        <ContrastLightTypography
          variant="P1"
          text={t({ message: `Humidity : ${hour.humidity}` })}
        />
        <ContrastLightTypography
          variant="P1"
          text={t({ message: `Rain : ${hour.chanceOfRain}` })}
        />
        <ContrastLightTypography
          variant="P1"
          text={t({ message: `Snow : ${hour.chanceOfSnow}` })}
        />
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
  borderRadius: theme.borderRadius.xl,
  boxShadow: shadowStyle,
}));

const ListContainer = styled.View(({ theme }) => ({
  flex: 1,
  gap: theme.spacings.s,
}));

const HoursContainer = styled.View(({ theme }) => ({
  paddingHorizontal: theme.spacings.m,
  flex: 1,
}));

const ListHeaderContainer = styled.View(({ theme }) => ({
  paddingTop: theme.spacings.m,
  paddingHorizontal: theme.spacings.m,
}));

const Background = styled.View(({ theme }) => ({
  borderRadius: theme.borderRadius.xl,
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
  gap: theme.spacings.xs,
}));

const ContrastLightTypography = styled(Typography)(({ theme }) => ({
  color: theme.colors.contrastLight,
}));

const EndOfDayContainer = styled.View(({ theme }) => ({
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacings.l,
}));
