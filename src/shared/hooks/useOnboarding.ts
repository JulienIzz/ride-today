import { useEffect } from "react";
import { useMMKVBoolean } from "react-native-mmkv";

import { useGlobalModalActions } from "#modules/modal/useModal";
import { storage, StorageKeys } from "#shared/mmkv/store";

export const useOnboarding = () => {
  const { showOnboarding } = useGlobalModalActions();

  const [hasReadOnboarding = false, setHasReadOnboarding] = useMMKVBoolean(
    StorageKeys.HAS_READ_ONBOARDING,
    storage,
  );

  useEffect(() => {
    if (!hasReadOnboarding) {
      showOnboarding();
    }
  }, [hasReadOnboarding, showOnboarding, setHasReadOnboarding]);
};
