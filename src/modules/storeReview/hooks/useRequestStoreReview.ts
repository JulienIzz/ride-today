import * as StoreReview from "expo-store-review";
import { useEffect } from "react";

import { canRequestStoreReview } from "#modules/storeReview/domain/reviewRequestEligibility";
import { storage, StorageKeys } from "#shared/mmkv/store";

export const useRequestStoreReview = ({ enabled }: { enabled: boolean }) => {
  useEffect(() => {
    if (!enabled) return;

    const appLaunchCount = storage.getNumber(StorageKeys.APP_LAUNCH_COUNT) ?? 0;
    const hasRequestedStoreReview =
      storage.getBoolean(StorageKeys.HAS_REQUESTED_STORE_REVIEW) ?? false;

    if (!canRequestStoreReview({ appLaunchCount, hasRequestedStoreReview })) {
      return;
    }

    const requestReview = async () => {
      if (!(await StoreReview.isAvailableAsync())) return;

      storage.set(StorageKeys.HAS_REQUESTED_STORE_REVIEW, true);
      await StoreReview.requestReview();
    };

    // The OS decides whether the dialog actually shows; ignore store errors.
    requestReview().catch(() => undefined);
  }, [enabled]);
};
