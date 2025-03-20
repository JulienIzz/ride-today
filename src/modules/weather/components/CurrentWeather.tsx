import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { t } from "@lingui/core/macro";
import { format } from "date-fns";
import { CloudRain, Moon, Sun, Waves, Wind } from "lucide-react-native";
import { View } from "react-native";

import { FlexView } from "#design-system/utils/FlexView";
import {
  CurrentWeatherContainer,
  WeatherLocationLoading,
  WeatherLocationMissing,
} from "#modules/weather/components/CurrentWeatherContainer";
import { WeatherNotation } from "#modules/weather/components/WeatherNotation";
import { useWeather } from "#modules/weather/hooks/useCurrentWeather.query";
import { useUnitSystem } from "#modules/weather/hooks/useUnitSystem";
import { Typography } from "#shared/fonts/Typography";
import { getConditionsTranslation } from "#shared/i18n/getConditionsTranslation";
import { QueryErrorBoundary } from "#shared/infra/boundaries/QueryBoundary";

export const CurrentWeather = ({
  location,
}: {
  location: string | undefined;
}) => {
  if (!location) return <WeatherLocationMissing />;

  return (
    <QueryErrorBoundary
      resetKeys={[location]}
      loadingFallback={<WeatherLocationLoading />}
      errorFallback={<WeatherLocationMissing />}
    >
      <CurrentWeatherContainer>
        <CurrentWeatherData location={location} />
      </CurrentWeatherContainer>
    </QueryErrorBoundary>
  );
};

export const CurrentWeatherData = ({ location }: { location: string }) => {
  const theme = useTheme();
  const { currentWeather, currentLocation } = useWeather(location);

  const unitSystem = useUnitSystem();

  const conditionText = getConditionsTranslation(
    currentWeather.condition.code,
    currentWeather.isDay === 1,
  );

  return (
    <FlexView>
      <WeatherContainer>
        <SideContainer>
          <View>
            <TemperatureContainer>
              <Temperature>{currentWeather.temp[unitSystem]}</Temperature>
              <Degrees>{unitSystem === "imperial" ? "°F" : "°C"}</Degrees>
            </TemperatureContainer>
            <Typography
              variant="P1"
              text={t({
                message: `Feelslike ${currentWeather.feelslike[unitSystem]}`,
              })}
            />
          </View>
          {conditionText ? (
            <Typography variant="P1" text={conditionText} />
          ) : null}
        </SideContainer>
        <SideContainer>
          <IconAndText>
            <Waves color={theme.colors.contrast} size={20} />
            <Typography
              variant="P1"
              text={t({ message: `Humidity : ${currentWeather.humidity}` })}
            />
          </IconAndText>
          <IconAndText>
            <Wind color={theme.colors.contrast} size={20} />
            <Typography
              variant="P1"
              text={t({
                message: `Wind : ${currentWeather.wind[unitSystem]}`,
              })}
            />
          </IconAndText>
          <IconAndText>
            <CloudRain color={theme.colors.contrast} size={20} />
            <Typography
              variant="P1"
              text={t({
                message: `Precip. : ${currentWeather.precip[unitSystem]}`,
              })}
            />
          </IconAndText>
          <IconAndText>
            {currentWeather.isDay === 1 ? (
              <Sun color={theme.colors.contrast} size={20} />
            ) : (
              <Moon color={theme.colors.contrast} size={20} />
            )}
            <Typography
              variant="P1"
              text={`${format(currentLocation.localTime, "HH:mm")} - ${
                currentWeather.isDay === 1
                  ? t({ message: "Day" })
                  : t({ message: "Night" })
              }`}
            />
          </IconAndText>
        </SideContainer>
      </WeatherContainer>
      <WeatherNotation conditionNotation={currentWeather.condition.notation} />
    </FlexView>
  );
};

const WeatherContainer = styled.View(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacings.s,
  padding: theme.spacings.m,
}));

const SideContainer = styled.View(({ theme }) => ({
  flex: 1,
  gap: theme.spacings.s,
}));

const TemperatureContainer = styled.View(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacings.xs,
}));

const Temperature = styled.Text(({ theme }) => ({
  fontSize: 50,
  fontFamily: theme.fonts.bold,
  color: theme.colors.contrast,
  lineHeight: 53,
}));

const Degrees = styled.Text(({ theme }) => ({
  fontSize: 20,
  fontFamily: theme.fonts.bold,
  color: theme.colors.contrast,
}));

const IconAndText = styled.View(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacings.xs,
}));
