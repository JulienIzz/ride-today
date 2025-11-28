import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

import { useRideScoreDetails } from "#modules/rideScore/utils/rideScoreDetails";
import type { ConditionNotation } from "#modules/weather/types/weather.types";
import { Typography } from "#shared/fonts/Typography";

export const RideScoreModalContent = () => {
  const theme = useTheme();
  const { _ } = useLingui();

  const rideScoreDetails = useRideScoreDetails();

  return (
    <TextContainer>
      <Title
        variant="H2"
        color={theme.colors.neutral[0]}
        bold
        text={_(msg`About the RideScore`)}
      />
      <Typo
        variant="P1"
        color={theme.colors.neutral[0]}
        text={_(
          msg`The RideScore is a score that represents the estimated quality of the ride. It is based on several factors related to the current weather, time of the day and temperature.`,
        )}
      />
      <Typo
        variant="P1"
        color={theme.colors.neutral[0]}
        text={_(
          msg`We wish to remind you that the RideScore is an estimation and that the actual quality of the ride may vary. DO NOT rely solely on the RideScore to determine if you should ride or not, always check the weather and the road conditions.`,
        )}
      />
      <Typo
        variant="H3"
        color={theme.colors.neutral[0]}
        bold
        text={_(msg`Rating System`)}
      />
      <Typo
        variant="P1"
        color={theme.colors.neutral[0]}
        text={_(
          msg`The score goes from 0 to 5, where 0 is the worst and 5 is the best. To take into account night time and the increased danger, we divide by two the score. Here is a breakdown of the score:`,
        )}
      />
      <DetailsContainer>
        {([0, 1, 2, 3, 4, 5] as ConditionNotation[]).map((rating) => (
          <Row key={rating}>
            <ColorPill color={rideScoreDetails[rating].color} />
            <Typo
              variant="P1"
              color={theme.colors.neutral[0]}
              text={`${rating} : ${rideScoreDetails[rating].description}`}
            />
          </Row>
        ))}
      </DetailsContainer>
    </TextContainer>
  );
};

const TextContainer = styled.View(({ theme }) => ({
  gap: theme.spacings.m,
}));

const Title = styled(Typography)({
  textAlign: "center",
});

const DetailsContainer = styled.View(({ theme }) => ({
  gap: theme.spacings.m,
}));

const Typo = styled(Typography)({
  flex: 1,
  textAlign: "justify",
});

const Row = styled.View(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacings.s,
}));

const ColorPill = styled.View<{ color: string | undefined }>(
  ({ theme, color }) => ({
    backgroundColor: color ?? theme.colors.neutral[0],
    borderRadius: theme.borderRadius.round,
    width: 10,
    height: "100%",
  }),
);
