const commonTheme = {
  spacings: {
    "3xs": 1,
    "2xs": 2,
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    "2xl": 40,
    "3xl": 48,
  },
  borderRadius: {
    none: 0,
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    round: 9999,
  },
  fontSizes: {
    "2xs": 8,
    xs: 10,
    s: 12,
    m: 14,
    l: 16,
    xl: 20,
    "2xl": 24,
    "3xl": 32,
    tagline: 32,
  },
  fonts: {
    regular: "Montserrat_400Regular",
    semiBold: "Montserrat_600SemiBold",
    boldItalic: "Montserrat_800ExtraBold_Italic",
  },
} as const;

const darkThemeObject = {
  colors: {
    primary: "#C9FF33",
    secondary: "#7E33FF",
    background: {
      app: "#1F1F1F",
      component: "#313131",
    },
    error: "#FF3333",
    disabled: "#333333",
    inactive: "#808080",
    link: "#29a6ff",
    neutral: {
      100: "#000000",
      80: "#313131",
      50: "#4D4D4D",
      30: "#535353",
      20: "#A7A7A7",
      10: "#CBCBCB",
      0: "#FFFFFF",
    },
    rideScore: {
      0: "#000000",
      "0-contrast": "#FFFFFF",
      1: "#cc3232",
      2: "#db7b2b",
      3: "#e7b416",
      4: "#99c140",
      5: "#2dc937",
    },
  },
  ...commonTheme,
};

const lightThemeObject = {
  colors: {
    primary: "#7E33FF",
    secondary: "#C9FF33",
    background: {
      app: "#F5F5F5F5",
      component: "#FFFFFF",
    },
    error: "#FF3333",
    disabled: "#333333",
    inactive: "#808080",
    link: "#0000EE",
    neutral: {
      100: "#FFFFFF",
      80: "#CBCBCB",
      50: "#A7A7A7",
      30: "#535353",
      20: "#4D4D4D",
      10: "#313131",
      0: "#000000",
    },
    rideScore: {
      0: "#000000",
      "0-contrast": "#FFFFFF",
      1: "#cc3232",
      2: "#db7b2b",
      3: "#e7b416",
      4: "#99c140",
      5: "#2dc937",
    },
  },
  ...commonTheme,
};

export type Theme = typeof darkThemeObject;

export const lightTheme: Theme = lightThemeObject;

export const darkTheme: Theme = darkThemeObject;
