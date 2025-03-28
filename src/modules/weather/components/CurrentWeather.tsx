import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { t } from "@lingui/core/macro";
import { format } from "date-fns";
import { CloudRain, Moon, Sun, Waves, Wind } from "lucide-react-native";
import { View } from "react-native";

import { FlexView } from "#design-system/utils/FlexView";
import { RideScore } from "#modules/rideScore/components/RideScore";
import { CurrentWeatherContainer } from "#modules/weather/components/CurrentWeatherContainer";
import { useUnitSystem } from "#modules/weather/hooks/useUnitSystem";
import { UnitsEnum } from "#modules/weather/types/units.types";
import type { Current, Location } from "#modules/weather/types/weather.types";
import { Typography } from "#shared/fonts/Typography";

export const CurrentWeather = ({
  currentWeather,
  currentLocation,
}: {
  currentWeather: Current;
  currentLocation: Location;
}) => {
  const theme = useTheme();

  const unitSystem = useUnitSystem();

  return (
    <CurrentWeatherContainer>
      <FlexView>
        <WeatherContainer>
          <SideContainer>
            <View>
              <TemperatureContainer>
                <Temperature>{currentWeather.temp[unitSystem]}</Temperature>
                <Degrees>
                  {unitSystem === UnitsEnum.IMPERIAL ? "°F" : "°C"}
                </Degrees>
              </TemperatureContainer>
              <Typography
                variant="P1"
                text={t({
                  message: `Feelslike ${currentWeather.feelslike[unitSystem]}`,
                })}
              />
            </View>
            <Typography variant="P1" text={currentWeather.condition.text} />
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
        <RideScore conditionNotation={currentWeather.condition.notation} />
      </FlexView>
    </CurrentWeatherContainer>
  );
};

const WeatherContainer = styled.View(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacings.s,
  padding: theme.spacings.m,
}));

const SideContainer = styled.View(({ theme }) => ({
  flex: 1,
  height: 125,
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
