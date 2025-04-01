import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import {
  CloudRain,
  Moon,
  Snowflake,
  Sun,
  Waves,
  Wind,
} from "lucide-react-native";

import { RideScoreMini } from "#modules/rideScore/components/RideScoreMini";
import { useUnitSystem } from "#modules/weather/hooks/useUnitSystem";
import type { Hour } from "#modules/weather/types/weather.types";
import { formatToDisplayHour } from "#modules/weather/utils/formatToDisplayHour";
import { Typography } from "#shared/fonts/Typography";

export const HourWeather = ({ hour }: { hour: Hour }) => {
  const theme = useTheme();

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
        <Typography
          color={theme.colors.contrastLight}
          numberOfLines={2}
          variant="P1"
          text={hour.condition.text}
        />
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
