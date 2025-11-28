import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
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
  const { _ } = useLingui();

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
              variant="H4"
              color={theme.colors.neutral[0]}
              bold
              text={_(msg`Next hours`)}
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
      <MoonStar size={40} strokeWidth={1} color={theme.colors.neutral[0]} />
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
  padding: theme.spacings.m,
}));

const Background = styled.View(({ theme }) => ({
  borderRadius: theme.borderRadius.m,
  backgroundColor: theme.colors.background.component,
  opacity: 0.6,
}));

const EndOfDayContainer = styled.View(({ theme }) => ({
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacings.l,
}));
