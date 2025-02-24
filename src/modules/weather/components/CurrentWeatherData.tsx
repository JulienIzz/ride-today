import styled from "@emotion/native";
import { t } from "@lingui/core/macro";
import { View } from "react-native";

import { useWeather } from "#modules/weather/hooks/useCurrentWeather.query";
import { Typography } from "#shared/fonts/Typography";

export const CurrentWeatherData = ({ location }: { location: string }) => {
  const { currentWeather } = useWeather(location);

  return (
    <Container>
      <LeftContainer>
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
        <Typography variant="body" text={currentWeather.condition.text} />
      </LeftContainer>
      <RightContainer>
        <Typography
          variant="body"
          text={t({ message: `Humidity : ${currentWeather.humidity}%` })}
        />
        <Typography
          variant="body"
          text={t({ message: `Wind speed : ${currentWeather.windKph} km/h` })}
        />
        <Typography
          variant="body"
          text={t({ message: `Precipitation : ${currentWeather.precipMm} mm` })}
        />
        <Typography
          variant="body"
          text={
            currentWeather.isDay === 1
              ? t({ message: "Day" })
              : t({ message: "Night" })
          }
        />
      </RightContainer>
    </Container>
  );
};

const Container = styled.View(({ theme }) => ({
  flex: 1,
  flexDirection: "row",
  gap: theme.spacings.s,
}));

const LeftContainer = styled.View({
  flex: 1,
  gap: 10,
});

const RightContainer = styled.View(({ theme }) => ({
  flex: 1,
  gap: theme.spacings.xs,
}));

const TemperatureContainer = styled.View(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacings.xs,
}));

const Temperature = styled.Text(({ theme }) => ({
  fontSize: 50,
  fontFamily: theme.fonts.title,
  color: theme.colors.black,
  lineHeight: 53,
}));

const Degrees = styled.Text(({ theme }) => ({
  fontSize: 20,
  fontFamily: theme.fonts.title,
  color: theme.colors.black,
}));
