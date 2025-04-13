import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { t } from "@lingui/core/macro";
import { MapPinOff } from "lucide-react-native";
import { memo, useState } from "react";
import { CurveType, LineChart } from "react-native-gifted-charts";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { absoluteFillStyle } from "#design-system/utils/absoluteFillStyle";
import { FlexView } from "#design-system/utils/FlexView";
import { useChartsDataFromWeather } from "#modules/charts/hooks/useChartsDataFromWeather";
import { BOTTOM_MENU_HEIGHT } from "#modules/home/utils/constants";
import { useLocationStore } from "#modules/location/hooks/useLocationStore.hook";
import { Spacer } from "#shared/components/Spacer";
import { Typography } from "#shared/fonts/Typography";
import { QueryErrorBoundary } from "#shared/infra/boundaries/QueryBoundary";
import { shadowStyle } from "#shared/styling/shadowStyle";

export const Charts = memo(() => {
  const theme = useTheme();
  const { bottom } = useSafeAreaInsets();

  const location = useLocationStore((state) => state.location);

  const [chartMaxHeight, setChartMaxHeight] = useState(0);

  const days = ["today", "tomorrow"] as const;

  return (
    <Container>
      {days.map((day) => (
        <ChartContainer key={day}>
          <Background style={absoluteFillStyle} />
          <Typography
            text={day === "today" ? t`Today` : t`Tomorrow`}
            variant="H4"
            bold
            color={theme.colors.neutral[0]}
          />
          <FlexView
            onLayout={({ nativeEvent }) => {
              const { height } = nativeEvent.layout;
              setChartMaxHeight(height - 30);
            }}
          >
            {location ? (
              <QueryErrorBoundary resetKeys={[location]}>
                <DailyLineChart
                  location={location}
                  height={chartMaxHeight}
                  day={day}
                />
              </QueryErrorBoundary>
            ) : (
              <CenteredView>
                <MapPinOff color={theme.colors.neutral[0]} size={50} />
              </CenteredView>
            )}
          </FlexView>
        </ChartContainer>
      ))}
      <Spacer size={BOTTOM_MENU_HEIGHT + bottom} vertical />
    </Container>
  );
});
Charts.displayName = "Charts";

const DailyLineChart = ({
  location,
  height,
  day,
}: {
  location: string;
  height?: number;
  day: "today" | "tomorrow";
}) => {
  const theme = useTheme();

  const { today, tomorrow, localDate } = useChartsDataFromWeather(location);

  const nowIndex = localDate.getHours();
  const scrolltoIndex = Math.max(0, nowIndex - 3);

  return (
    <LineChart
      // COMMON CONFIG
      data={day === "today" ? today : tomorrow}
      maxValue={5}
      stepValue={1}
      noOfSections={5}
      height={height}
      curved
      curveType={CurveType.QUADRATIC}
      interpolateMissingValues
      color={theme.colors.primary}
      rulesColor={theme.colors.inactive}
      roundToDigits={0}
      // X AXIS
      xAxisColor={theme.colors.inactive}
      spacing={40}
      verticalLinesColor={theme.colors.inactive}
      initialSpacing={0}
      // Y AXIS
      yAxisColor={theme.colors.inactive}
      yAxisTextStyle={{
        fontFamily: theme.fonts.regular,
        color: theme.colors.neutral[0],
      }}
      dashGap={12}
      dashWidth={1}
      // DATA POINTS
      dataPointsColor={theme.colors.primary}
      // AREA
      areaChart
      startFillColor={theme.colors.primary}
      startOpacity={0.3}
      endFillColor={theme.colors.primary}
      endOpacity={0}
      // SCROLL
      scrollToIndex={day === "today" ? scrolltoIndex : undefined}
    />
  );
};

const Container = styled(FlexView)(({ theme }) => ({
  padding: theme.spacings.m,
  gap: theme.spacings.m,
}));

const ChartContainer = styled(FlexView)(({ theme }) => ({
  padding: theme.spacings.m,
  paddingRight: 0,
  gap: theme.spacings.m,
  overflow: "hidden",
  borderRadius: theme.borderRadius.m,
  boxShadow: shadowStyle,
}));

const CenteredView = styled.View({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
});

const Background = styled.View(({ theme }) => ({
  borderRadius: theme.borderRadius.m,
  backgroundColor: theme.colors.background.component,
  opacity: 0.85,
}));
