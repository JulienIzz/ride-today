import type { ExpoConfig } from "@expo/config";

const STAGE = process.env.STAGE || "dev";

if (STAGE !== "dev" && STAGE !== "staging" && STAGE !== "production") {
  throw new Error(`Invalid STAGE env var: ${STAGE}`);
}

const appConfig_DEV = {
  bundleId: "com.julienizz.ridetoday.dev",
  appName: "Ride Today DEV",
  waitForUpdateOnSplashScreenMs: 0,
  iosIcon: {
    light: "./assets/icons/ios-light-dev.png",
    dark: "./assets/icons/ios-dark-dev.png",
    tinted: "./assets/icons/ios-tinted-dev.png",
  },
  androidIcon: {
    foregroundImage: "./assets/icons/adaptive-icon.png",
    monochromeImage: "./assets/icons/adaptive-icon.png",
    backgroundColor: "#ffffff",
  },
};

const appConfig_STAGING: typeof appConfig_DEV = {
  bundleId: "com.julienizz.ridetoday.staging",
  appName: "Ride Today STAGING",
  waitForUpdateOnSplashScreenMs: 600000,
  iosIcon: {
    light: "./assets/icons/ios-light.png",
    dark: "./assets/icons/ios-dark.png",
    tinted: "./assets/icons/ios-tinted.png",
  },
  androidIcon: {
    foregroundImage: "./assets/icons/adaptive-icon.png",
    monochromeImage: "./assets/icons/adaptive-icon.png",
    backgroundColor: "#ffffff",
  },
};

const appConfig_PRODUCTION: typeof appConfig_DEV = {
  bundleId: "com.julienizz.ridetoday",
  appName: "Ride Today",
  waitForUpdateOnSplashScreenMs: 10000,
  iosIcon: {
    light: "./assets/icons/ios-light.png",
    dark: "./assets/icons/ios-dark.png",
    tinted: "./assets/icons/ios-tinted.png",
  },
  androidIcon: {
    foregroundImage: "./assets/icons/adaptive-icon.png",
    monochromeImage: "./assets/icons/adaptive-icon.png",
    backgroundColor: "#ffffff",
  },
};

const appConfigs = {
  dev: appConfig_DEV,
  staging: appConfig_STAGING,
  production: appConfig_PRODUCTION,
};

const appConfig = appConfigs[STAGE];

const config: ExpoConfig = {
  name: appConfig.appName,
  slug: "ride-today",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icons/ios-light.png",
  scheme: "ride-today",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: appConfig.bundleId,
    icon: appConfig.iosIcon,
  },
  android: {
    adaptiveIcon: appConfig.androidIcon,
    package: appConfig.bundleId,
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    "expo-font",
    [
      "expo-splash-screen",
      {
        image: "./assets/splashscreen/splash-icon-dark.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
        dark: {
          image: "./assets/splashscreen/splash-icon-light.png",
          backgroundColor: "#000000",
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: "26f4b8e4-4ca4-4e2b-a8e0-e22e33610184",
    },
  },
  updates: {
    fallbackToCacheTimeout: appConfig.waitForUpdateOnSplashScreenMs,
  },
  owner: "julienizz",
};

export default config;
