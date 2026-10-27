import { useTheme } from "@emotion/react";
import type { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useCallback, useMemo } from "react";
import { useWindowDimensions } from "react-native";

import { RideScoreModalContent } from "#modules/modal/modals/RideScoreModal";
import { Spacer } from "#shared/components/Spacer";
import { useWindowSafeAreaInsets } from "#shared/hooks/useWindowSafeAreaInsets";

// Widest the sheet gets on wide windows (e.g. an open iPhone Duo), so its
// lines of text stay short enough to read
const SHEET_MAX_WIDTH = 600;

interface RideScoreBottomSheetProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal | null>;
}

export const RideScoreBottomSheet = ({
  bottomSheetModalRef,
}: RideScoreBottomSheetProps) => {
  const theme = useTheme();
  // The sheet covers the whole window, so it needs the window insets even
  // when opened from a pager page that already consumed the side ones
  const { left, right, bottom } = useWindowSafeAreaInsets();
  const { width } = useWindowDimensions();

  const snapPoints = useMemo(() => ["50%", "90%"], []);

  // Like native sheets, the whole sheet stays clear of the side insets (the
  // iPhone Duo rail) rather than only its content, and it is centred once the
  // remaining width exceeds SHEET_MAX_WIDTH
  const sheetStyle = useMemo(() => {
    const centering = Math.max(0, (width - left - right - SHEET_MAX_WIDTH) / 2);
    return { marginLeft: left + centering, marginRight: right + centering };
  }, [width, left, right]);

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
      style={sheetStyle}
      ref={bottomSheetModalRef}
      enableDynamicSizing={false}
      snapPoints={snapPoints}
      index={0}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetScrollView style={{ padding: theme.spacings.l }}>
        <RideScoreModalContent />
        <Spacer vertical size={theme.spacings["3xl"] + bottom} />
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};
