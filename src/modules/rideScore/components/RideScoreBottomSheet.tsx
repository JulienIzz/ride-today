import { useTheme } from "@emotion/react";
import type { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useCallback, useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { RideScoreModalContent } from "#modules/modal/modals/RideScoreModal";
import { Spacer } from "#shared/components/Spacer";
import { useHorizontalSafePadding } from "#shared/hooks/useHorizontalSafePadding";

interface RideScoreBottomSheetProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal | null>;
}

export const RideScoreBottomSheet = ({
  bottomSheetModalRef,
}: RideScoreBottomSheetProps) => {
  const theme = useTheme();
  const { bottom } = useSafeAreaInsets();
  const horizontalPadding = useHorizontalSafePadding(theme.spacings.l);

  const snapPoints = useMemo(() => ["50%", "90%"], []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        enableTouchThrough={false}
      />
    ),
    [],
  );
  return (
    <BottomSheetModal
      backgroundStyle={{ backgroundColor: theme.colors.background.component }}
      ref={bottomSheetModalRef}
      enableDynamicSizing={false}
      snapPoints={snapPoints}
      index={0}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetScrollView
        style={{ padding: theme.spacings.l, ...horizontalPadding }}
      >
        <RideScoreModalContent />
        <Spacer vertical size={theme.spacings["3xl"] + bottom} />
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};
