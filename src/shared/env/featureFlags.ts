import type { FeatureFlags } from "#shared/env/appEnv";
import { appEnv } from "#shared/env/appEnv";

export const isFeatureEnabled = (feature: FeatureFlags) => {
  return appEnv.flags[feature];
};
