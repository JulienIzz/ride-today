import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { t } from "@lingui/core/macro";
import { memo, useState } from "react";
import type { lineDataItem } from "react-native-gifted-charts";
import { CurveType, LineChart } from "react-native-gifted-charts";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FlexView } from "#design-system/utils/FlexView";
import { useChartsDataFromWeather } from "#modules/charts/hooks/useChartsDataFromWeather";
import { BOTTOM_MENU_HEIGHT } from "#modules/home/utils/constants";
import { useLocationStore } from "#modules/location/hooks/useLocationStore.hook";
import { useWeather } from "#modules/weather/hooks/useCurrentWeather.query";
import { Spacer } from "#shared/components/Spacer";
import { Typography } from "#shared/fonts/Typography";
import { QueryErrorBoundary } from "#shared/infra/boundaries/QueryBoundary";
import { shadowStyle } from "#shared/styling/shadowStyle";

export const Charts = memo(() => {
  const location = useLocationStore((state) => state.location);

  return (
    <FlexView>
      {location ? (
        <QueryErrorBoundary resetKeys={[location]}>
          <ChartsData location={location} />
        </QueryErrorBoundary>
      ) : null}
    </FlexView>
  );
});
Charts.displayName = "Charts";

const ChartsData = memo(({ location }: { location: string }) => {
  const theme = useTheme();
  const { bottom } = useSafeAreaInsets();

  const [chartMaxHeight, setChartMaxHeight] = useState(0);

  const { forecastWeather } = useWeather(location);

  const { today, tomorrow } = useChartsDataFromWeather(forecastWeather);

  return (
    <Container>
      <ChartContainer>
        <Typography
          text={t`Today`}
          variant="H4"
          bold
          color={theme.colors.contrastLight}
        />
        <FlexView
          onLayout={({ nativeEvent }) => {
            const { height } = nativeEvent.layout;
            setChartMaxHeight(height - 30);
          }}
        >
          <DailyLineChart chartData={today} height={chartMaxHeight} />
        </FlexView>
      </ChartContainer>
      <ChartContainer>
        <Typography
          text={t`Tomorrow`}
          variant="H4"
          bold
          color={theme.colors.contrastLight}
        />
        <FlexView>
          <DailyLineChart chartData={tomorrow} height={chartMaxHeight} />
        </FlexView>
      </ChartContainer>
      <Spacer size={BOTTOM_MENU_HEIGHT + bottom} vertical />
    </Container>
  );
});
ChartsData.displayName = "ChartsData";

const DailyLineChart = ({
  chartData,
  height,
}: {
  chartData: lineDataItem[];
  height?: number;
}) => {
  const theme = useTheme();

  return (
    <LineChart
      // COMMON CONFIG
      data={chartData}
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
        color: theme.colors.contrastLight,
      }}
      dashGap={12}
      dashWidth={1}
      // DATA POINTS
      dataPointsColor={theme.colors.primary}
      // AREA
      areaChart
      startFillColor={theme.colors.primary}
      startOpacity={0.7}
      endFillColor={theme.colors.primary}
      endOpacity={0}
    />
  );
};

const Container = styled(FlexView)(({ theme }) => ({
  padding: theme.spacings.m,
  gap: theme.spacings.m,
}));

const ChartContainer = styled(FlexView)(({ theme }) => ({
  backgroundColor: theme.colors.componentBackground,
  padding: theme.spacings.m,
  paddingRight: 0,
  gap: theme.spacings.m,
  overflow: "hidden",
  borderRadius: theme.borderRadius.m,
  boxShadow: shadowStyle,
}));
