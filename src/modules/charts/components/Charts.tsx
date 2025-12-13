import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { MapPinOff } from "lucide-react-native";
import { memo } from "react";
import { ScrollView } from "react-native";
import { CurveType, LineChart } from "react-native-gifted-charts";

import { absoluteFillStyle } from "#design-system/utils/absoluteFillStyle";
import { FlexView } from "#design-system/utils/FlexView";
import { useChartsDataFromWeather } from "#modules/charts/hooks/useChartsDataFromWeather";
import { useLocationStore } from "#modules/location/hooks/useLocationStore.hook";
import { SpacerBottomMenu } from "#shared/components/Spacer";
import { Typography } from "#shared/fonts/Typography";
import { QueryErrorBoundary } from "#shared/infra/boundaries/QueryBoundary";
import { shadowStyle } from "#shared/styling/shadowStyle";

const CHART_HEIGHT = 200;
const CHART_CONTAINER_HEIGHT = CHART_HEIGHT + 100;

export const Charts = memo(() => {
  const theme = useTheme();
  const { _ } = useLingui();

  const location = useLocationStore((state) => state.location);

  const days = ["today", "tomorrow"] as const;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Container>
        {days.map((day) => (
          <ChartContainer key={day}>
            <Background style={absoluteFillStyle} />
            <TitlesContainer>
              <Typography
                text={_(msg`RideScore`)}
                variant="H4"
                bold
                color={theme.colors.neutral[0]}
              />
              <Typography
                text={day === "today" ? _(msg`Today`) : _(msg`Tomorrow`)}
                variant="H4"
                color={theme.colors.neutral[20]}
              />
            </TitlesContainer>
            {location ? (
              <QueryErrorBoundary resetKeys={[location]}>
                <DailyLineChart location={location} day={day} />
              </QueryErrorBoundary>
            ) : (
              <CenteredView>
                <MapPinOff color={theme.colors.neutral[0]} size={50} />
              </CenteredView>
            )}
          </ChartContainer>
        ))}
        <SpacerBottomMenu />
      </Container>
    </ScrollView>
  );
});
Charts.displayName = "Charts";

const DailyLineChart = ({
  location,
  day,
}: {
  location: string;
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
      height={CHART_HEIGHT}
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

const TitlesContainer = styled(FlexView)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  gap: theme.spacings.s,
  paddingRight: theme.spacings.m,
}));

const ChartContainer = styled.View(({ theme }) => ({
  padding: theme.spacings.m,
  paddingRight: 0,
  height: CHART_CONTAINER_HEIGHT,
  gap: theme.spacings.m,
  overflow: "hidden",
  borderRadius: theme.borderRadius.m,
  boxShadow: shadowStyle,
}));

const CenteredView = styled.View({
  ...absoluteFillStyle,
  justifyContent: "center",
  alignItems: "center",
});

const Background = styled.View(({ theme }) => ({
  borderRadius: theme.borderRadius.m,
  backgroundColor: theme.colors.background.component,
  opacity: 0.85,
}));
