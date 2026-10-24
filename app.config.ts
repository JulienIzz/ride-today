import type { ExpoConfig } from "@expo/config";

const STAGE = process.env.STAGE || "production";

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
    foregroundImage: "./assets/icons/adaptive-icon-dev.png",
    monochromeImage: "./assets/icons/adaptive-icon-dev.png",
    backgroundColor: "#ffffff",
  },
  appEnv: {
    flags: {
      CHEATCODES_ENABLED: true,
    },
  },
};

const appConfig_STAGING: typeof appConfig_DEV = {
  bundleId: "com.julienizz.ridetoday.staging",
  appName: "Ride Today STG",
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
  appEnv: {
    flags: {
      CHEATCODES_ENABLED: false,
    },
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
  appEnv: {
    flags: {
      CHEATCODES_ENABLED: false,
    },
  },
};

const appConfigs = {
  dev: appConfig_DEV,
  staging: appConfig_STAGING,
  production: appConfig_PRODUCTION,
};

const appConfig = appConfigs[STAGE as "dev" | "staging" | "production"];

export type AppEnv = (typeof appConfig_DEV)["appEnv"];

const config: ExpoConfig = {
  name: appConfig.appName,
  slug: "ride-today",
  orientation: "portrait",
  icon: "./assets/icons/ios-light.png",
  scheme: "ride-today",
  userInterfaceStyle: "automatic",
  ios: {
    supportsTablet: false,
    bundleIdentifier: appConfig.bundleId,
    icon: appConfig.iosIcon,
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
      CFBundleDevelopmentRegion: "fr",
      CFBundleLocalizations: ["fr", "en"],
      ITSAppUsesNonExemptEncryption: false,
      NSLocationWhenInUseUsageDescription:
        "Your location is used to get local weather conditions and calculate the ride enjoyment score.",
    },
  },
  android: {
    adaptiveIcon: appConfig.androidIcon,
    package: appConfig.bundleId,
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/icons/ios-dark.png",
  },
  plugins: [
    [
      "expo-build-properties",
      {
        ios: {
          useFrameworks: "static",
        },
      },
    ],
    "./plugins/versioning",
    "expo-router",
    "expo-localization",
    "expo-web-browser",
    "expo-font",
    "expo-image",
    "expo-status-bar",
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
    reactCompiler: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: "26f4b8e4-4ca4-4e2b-a8e0-e22e33610184",
    },
    STAGE,
    appEnv: appConfig.appEnv,
  },
  updates: {
    fallbackToCacheTimeout: appConfig.waitForUpdateOnSplashScreenMs,
  },
  owner: "julienizz",
};

export default config;
