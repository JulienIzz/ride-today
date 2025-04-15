import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { t } from "@lingui/core/macro";
import { BadgeInfo } from "lucide-react-native";
import { useCallback, useRef } from "react";

import { FlexView } from "#design-system/utils/FlexView";
import { RideScoreBottomSheet } from "#modules/rideScore/components/RideScoreBottomSheet";
import { useRideScoreDetails } from "#modules/rideScore/utils/rideScoreDetails";
import type { ConditionNotation } from "#modules/weather/types/weather.types";
import { Spacer } from "#shared/components/Spacer";
import { Typography } from "#shared/fonts/Typography";

export const RideScore = ({
  conditionNotation,
}: {
  conditionNotation: ConditionNotation | undefined;
}) => {
  const theme = useTheme();

  const rideScoreDetails = useRideScoreDetails();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  if (conditionNotation === undefined) return null;

  return (
    <Container>
      <Labels>
        <Typography
          variant="H4"
          color={theme.colors.neutral[0]}
          bold
          text={t`RideScore`}
        />
        <BadgeInfo
          color={theme.colors.neutral[0]}
          onPress={handlePresentModalPress}
          size={14}
          strokeWidth={3}
        />
        <Spacer />
        <Typography
          variant="P1"
          color={theme.colors.neutral[0]}
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
          color={theme.colors.neutral[0]}
          text={t({
            message: `${rideScoreDetails[conditionNotation].catchPhrase}`,
          })}
        />
      </Message>
      <RideScoreBottomSheet bottomSheetModalRef={bottomSheetModalRef} />
    </Container>
  );
};

const Container = styled(FlexView)(({ theme }) => ({
  gap: theme.spacings.s,
  borderRadius: theme.borderRadius.m,
  padding: theme.spacings.m,
  backgroundColor: theme.colors.background.component,
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
      ? theme.colors.rideScore[notation]
      : theme.colors.rideScore[0],
    borderRadius: theme.borderRadius.round,
    flex: 1,
    height: 10,
    opacity: enabled ? 1 : 0.7,
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
