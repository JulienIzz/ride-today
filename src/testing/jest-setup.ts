jest.mock("expo-localization", () => ({
  getLocales: () => [
    {
      languageCode: "en",
      countryCode: "US",
      languageTag: "en-US",
      isRTL: false,
    },
  ],

  locale: "en-US",
  isRTL: false,
  getNumberFormatSettings: () => ({
    decimalSeparator: ".",
    groupingSeparator: ",",
  }),
}));

jest.mock("react-native-gesture-handler", () => {
  const RNGH = jest.requireActual("react-native-gesture-handler");

  return {
    ...RNGH,

    RNGestureHandlerModule: {
      ...RNGH.RNGestureHandlerModule,
      install: jest.fn(),
      attachGestureHandler: jest.fn(),
      createGestureHandler: jest.fn(),
      updateGestureHandler: jest.fn(),
      dropGestureHandler: jest.fn(),
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    GestureHandlerRootView: ({ children }: any) => children,
  };
});

// react-native-nitro-modules throws at import time without native code.
// With it mocked, react-native-mmkv detects Jest and uses its in-memory mock.
jest.mock("react-native-nitro-modules", () => ({
  NitroModules: {
    createHybridObject: jest.fn(),
  },
}));

jest.mock("expo-splash-screen", () => ({
  preventAutoHideAsync: jest.fn(() => Promise.resolve()),
  hideAsync: jest.fn(() => Promise.resolve()),
  setOptions: jest.fn(),
}));

export {};
