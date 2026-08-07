import { useEffect } from "react";

import { storage, StorageKeys } from "#shared/mmkv/store";

// Module-level guard: a launch is one process start, not one mount of the
// root layout (fast refresh in dev can remount it).
let hasTrackedLaunch = false;

export const useTrackAppLaunch = () => {
  useEffect(() => {
    if (hasTrackedLaunch) return;
    hasTrackedLaunch = true;

    const appLaunchCount = storage.getNumber(StorageKeys.APP_LAUNCH_COUNT) ?? 0;
    storage.set(StorageKeys.APP_LAUNCH_COUNT, appLaunchCount + 1);
  }, []);
};
