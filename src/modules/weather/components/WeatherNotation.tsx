import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { t } from "@lingui/core/macro";
import { BadgeInfo } from "lucide-react-native";

import { FlexView } from "#design-system/utils/FlexView";
import type { ConditionNotation } from "#modules/weather/types/weather.types";
import { Spacer } from "#shared/components/Spacer";
import { Typography } from "#shared/fonts/Typography";

export const WeatherNotation = ({
  conditionNotation,
}: {
  conditionNotation: ConditionNotation | undefined;
}) => {
  const theme = useTheme();
  if (conditionNotation === undefined) return null;

  return (
    <Container>
      <Labels>
        <Typography
          variant="P1"
          color={theme.colors.contrastLight}
          bold
          text={t`RideScore`}
        />
        <BadgeInfo
          color={theme.colors.contrastLight}
          size={14}
          strokeWidth={3}
        />
        <Spacer />
        <Typography
          variant="P1"
          color={theme.colors.contrastLight}
          bold
          text={`${conditionNotation} / 5`}
        />
      </Labels>
      <Ranking>
        {[1, 2, 3, 4, 5].map((rank) => (
          <RankPill
            key={rank}
            notation={conditionNotation}
            enabled={rank <= conditionNotation}
          />
        ))}
      </Ranking>
      <Message>
        <MessageText
          variant="P2"
          color={theme.colors.contrastLight}
          text={t({
            message: `${notationDetails[conditionNotation].message}`,
          })}
        />
      </Message>
    </Container>
  );
};

const Container = styled(FlexView)(({ theme }) => ({
  gap: theme.spacings.s,
  borderRadius: theme.borderRadius.xl,
  paddingHorizontal: theme.spacings.m,
  paddingVertical: theme.spacings.s,
  backgroundColor: theme.colors.componentBackground,
  justifyContent: "flex-start",
  alignItems: "center",
  transform: [{ translateY: 2 }],
}));

const Labels = styled.View(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacings.xs,
}));

const Ranking = styled.View(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacings.s,
  justifyContent: "space-between",
}));

const RankPill = styled.View<{ enabled: boolean; notation: ConditionNotation }>(
  ({ theme, enabled, notation }) => ({
    backgroundColor: enabled
      ? notationDetails[notation].color
      : theme.colors.contrast,
    borderRadius: theme.borderRadius.round,
    flex: 1,
    height: 10,
    opacity: enabled ? 1 : 0.5,
  }),
);

const Message = styled.View({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
});

const MessageText = styled(Typography)({
  textAlign: "center",
});

const notationDetails = {
  0: {
    color: undefined,
    message: t`Very risky. Ride only if absolutely necessary.`,
  },
  1: {
    color: "#cc3232",
    message: t`Severely hazardous, better to stay off the road.`,
  },
  2: {
    color: "#db7b2b",
    message: t`Challenging conditions, stay sharp and be prepared.`,
  },
  3: {
    color: "#e7b416",
    message: t`Manageable, ride carefully and watch for trouble.`,
  },
  4: {
    color: "#99c140",
    message: t`Favorable weather. Expect a decent, comfortable ride.`,
  },
  5: {
    color: "#2dc937",
    message: t`Ideal condition ! Hit the road and enjoy!`,
  },
};
