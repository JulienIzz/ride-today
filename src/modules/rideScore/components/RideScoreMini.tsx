import styled from "@emotion/native";
import { useTheme } from "@emotion/react";

import type { ConditionNotation } from "#modules/weather/domain/types";
import { Spacer } from "#shared/components/Spacer";
import { Typography } from "#shared/fonts/Typography";

export const RideScoreMini = ({
  score,
}: {
  score: ConditionNotation | undefined;
}) => {
  const theme = useTheme();

  if (score === undefined) return null;

  return (
    <Container>
      {[1, 2, 3, 4, 5].map((rank) => (
        <ScorePill key={rank} enabled={rank <= score} score={score} />
      ))}
      <Spacer horizontal size={theme.spacings.xs} />
      <Typography
        variant="P1"
        color={theme.colors.neutral[0]}
        bold
        text={`${score} / 5`}
      />
    </Container>
  );
};

const ScorePill = styled.View<{ enabled: boolean; score: ConditionNotation }>(
  ({ theme, enabled, score }) => {
    return {
      backgroundColor: enabled
        ? theme.colors.rideScore[score]
        : theme.colors.rideScore["0-contrast"],
      borderRadius: theme.borderRadius.round,
      height: 6,
      width: 12,
    };
  },
);

const Container = styled.View(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacings.xs,
  alignItems: "center",
}));
