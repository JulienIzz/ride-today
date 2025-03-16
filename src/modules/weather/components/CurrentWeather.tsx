import styled from "@emotion/native";
import { t } from "@lingui/core/macro";
import { format } from "date-fns";
import { CloudRain, Moon, Sun, Waves, Wind } from "lucide-react-native";
import { View } from "react-native";

import {
  CurrentWeatherContainer,
  WeatherLocationMissing,
} from "#modules/weather/components/CurrentWeatherContainer";
import { useWeather } from "#modules/weather/hooks/useCurrentWeather.query";
import { useUnitSystem } from "#modules/weather/hooks/useUnitSystem";
import { Typography } from "#shared/fonts/Typography";
import { getConditionsTranslation } from "#shared/i18n/getConditionsTranslation";

export const CurrentWeather = ({ location }: { location: string | null }) => {
  if (!location) return <WeatherLocationMissing />;

  return (
    <CurrentWeatherContainer>
      <CurrentWeatherData location={location} />
    </CurrentWeatherContainer>
  );
};

export const CurrentWeatherData = ({ location }: { location: string }) => {
  const { currentWeather, currentLocation } = useWeather(location);

  const unitSystem = useUnitSystem();

  const conditionText = getConditionsTranslation(
    currentWeather.condition.code,
    currentWeather.isDay === 1,
  );

  return (
    <WeatherContainer>
      <SideContainer>
        <View>
          <TemperatureContainer>
            <Temperature>{currentWeather.temp[unitSystem]}</Temperature>
            <Degrees>{unitSystem === "imperial" ? "°F" : "°C"}</Degrees>
          </TemperatureContainer>
          <Typography
            variant="body"
            text={t({
              message: `Feelslike ${currentWeather.feelslike[unitSystem]}`,
            })}
          />
        </View>
        {conditionText ? (
          <Typography variant="body" text={conditionText} />
        ) : null}
      </SideContainer>
      <SideContainer>
        <IconAndText>
          <Waves color={"black"} size={20} />
          <Typography
            variant="body"
            text={t({ message: `Humidity : ${currentWeather.humidity}` })}
          />
        </IconAndText>
        <IconAndText>
          <Wind color={"black"} size={20} />
          <Typography
            variant="body"
            text={t({
              message: `Wind : ${currentWeather.wind[unitSystem]}`,
            })}
          />
        </IconAndText>
        <IconAndText>
          <CloudRain color={"black"} size={20} />
          <Typography
            variant="body"
            text={t({
              message: `Precipitation : ${currentWeather.precip[unitSystem]}`,
            })}
          />
        </IconAndText>
        <IconAndText>
          {currentWeather.isDay === 1 ? (
            <Sun color={"black"} size={20} />
          ) : (
            <Moon color={"black"} size={20} />
          )}
          <Typography
            variant="body"
            text={`${format(currentLocation.localTime, "HH:mm")} - ${
              currentWeather.isDay === 1
                ? t({ message: "Day" })
                : t({ message: "Night" })
            }`}
          />
        </IconAndText>
      </SideContainer>
    </WeatherContainer>
  );
};

const WeatherContainer = styled.View(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacings.s,
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
  fontFamily: theme.fonts.title,
  color: theme.colors.contrast,
  lineHeight: 53,
}));

const Degrees = styled.Text(({ theme }) => ({
  fontSize: 20,
  fontFamily: theme.fonts.title,
  color: theme.colors.contrast,
}));

const IconAndText = styled.View(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacings.xs,
}));
