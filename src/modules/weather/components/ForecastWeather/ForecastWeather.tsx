import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { t } from "@lingui/core/macro";
import { MoonStar } from "lucide-react-native";
import { Fragment } from "react";

import { absoluteFillStyle } from "#design-system/utils/absoluteFillStyle";
import { FlexView } from "#design-system/utils/FlexView";
import { HourWeather } from "#modules/weather/components/ForecastWeather/HourWeather";
import type { Forecast, Location } from "#modules/weather/types/weather.types";
import { filterOnlyNextHours } from "#modules/weather/utils/filterOnlyNextHours";
import { Divider } from "#shared/components/Divider";
import { Typography } from "#shared/fonts/Typography";
import { shadowStyle } from "#shared/styling/shadowStyle";

export const ForecastWeather = ({
  forecastWeather,
  currentLocation,
}: {
  forecastWeather: Forecast;
  currentLocation: Location;
}) => {
  const theme = useTheme();

  const HoursWeather = filterOnlyNextHours({
    hours: forecastWeather.forecastday[0]?.hour,
    currentHour: new Date(currentLocation.localTime),
  });

  return (
    <FlexView>
      <Container>
        <Background style={absoluteFillStyle} />
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
              <Fragment key={index}>
                <HourWeather hour={hour} />
                <Divider />
              </Fragment>
            ))}
            <EndOfDay />
          </HoursContainer>
        </FlexView>
      </Container>
    </FlexView>
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

const EndOfDayContainer = styled.View(({ theme }) => ({
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacings.l,
}));
