import styled from "@emotion/native";
import { t } from "@lingui/core/macro";
import { format } from "date-fns";
import {
  CloudRain,
  MapPinOff,
  Moon,
  Sun,
  Waves,
  Wind,
} from "lucide-react-native";
import { View } from "react-native";

import { useWeather } from "#modules/weather/hooks/useCurrentWeather.query";
import { Typography } from "#shared/fonts/Typography";
import { getConditionsTranslation } from "#shared/i18n/getConditionsTranslation";

export const CurrentWeather = ({ location }: { location: string | null }) => {
  if (!location)
    return (
      <Container>
        <NoLocation />
      </Container>
    );

  return (
    <Container>
      <CurrentWeatherData location={location} />
    </Container>
  );
};

export const CurrentWeatherData = ({ location }: { location: string }) => {
  const { currentWeather, currentLocation } = useWeather(location);

  const conditionText = getConditionsTranslation(
    currentWeather.condition.code,
    currentWeather.isDay === 1,
  );

  return (
    <WeatherContainer>
      <SideContainer>
        <View>
          <TemperatureContainer>
            <Temperature>{currentWeather.tempC}</Temperature>
            <Degrees>°C</Degrees>
          </TemperatureContainer>
          <Typography
            variant="body"
            text={t({ message: `Feelslike ${currentWeather.feelslikeC}°C` })}
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
            text={t({ message: `Humidity : ${currentWeather.humidity}%` })}
          />
        </IconAndText>
        <IconAndText>
          <Wind color={"black"} size={20} />
          <Typography
            variant="body"
            text={t({ message: `Wind speed : ${currentWeather.windKph} km/h` })}
          />
        </IconAndText>
        <IconAndText>
          <CloudRain color={"black"} size={20} />
          <Typography
            variant="body"
            text={t({
              message: `Precipitation : ${currentWeather.precipMm} mm`,
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

const NoLocation = () => {
  return (
    <NoLocationContainer>
      <MapPinOff color="black" size={50} />
      <LabelContainer>
        <Typography variant="body" text={t`No location selected`} />
        <Typography variant="body" text={t`select one or select geolocation`} />
      </LabelContainer>
    </NoLocationContainer>
  );
};

const Container = styled.View(({ theme }) => ({
  height: 200,
  width: "100%",
  backgroundColor: theme.colors.primary,
  borderRadius: theme.borderRadius.xl,
  padding: theme.spacings.m,
}));

const WeatherContainer = styled.View(({ theme }) => ({
  flex: 1,
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

const NoLocationContainer = styled.View(({ theme }) => ({
  flex: 1,
  gap: theme.spacings.m,
  justifyContent: "center",
  alignItems: "center",
}));

const LabelContainer = styled.View(({ theme }) => ({
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacings.xs,
}));

const IconAndText = styled.View(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacings.xs,
}));
