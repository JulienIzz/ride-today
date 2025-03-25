import { useEffect } from "react";

import { useGlobalModalActions } from "#modules/modal/useModal";
import { useMMKVOnboarding } from "#shared/mmkv/useMMKV";

export const useOnboarding = () => {
  const { showOnboarding } = useGlobalModalActions();

  const { hasReadOnboarding } = useMMKVOnboarding();

  useEffect(() => {
    if (!hasReadOnboarding) {
      showOnboarding();
    }
  }, [hasReadOnboarding, showOnboarding]);
};
