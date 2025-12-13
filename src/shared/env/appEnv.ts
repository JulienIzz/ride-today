import Constants from "expo-constants";

import type { AppEnv } from "../../../app.config";

const maybeAppEnv = Constants.expoConfig?.extra?.["appEnv"];

if (!maybeAppEnv) {
  // eslint-disable-next-line no-console
  console.dir(Constants.expoConfig, { depth: null });
  throw new Error("appEnv is missing");
}

export const appEnv = maybeAppEnv as AppEnv;

export type FeatureFlags = keyof typeof appEnv.flags;
