const commonTheme = {
  spacings: {
    "3xs": 1,
    "2xs": 2,
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
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
    bold: "Montserrat_800ExtraBold_Italic",
  },
} as const;

const darkThemeObject = {
  colors: {
    appBackground: "#1F1F1F",
    primary: "#C8FF33",
    contrast: "#000000",
    contrastLight: "#FFFFFF",
    inactive: "#808080",
    disabled: "#333333",
    componentBackground: "#313131",
    error: "#FF3333",
    rideScore: {
      0: "#000000",
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
    appBackground: "#F5F5F5",
    primary: "#7F33FF",
    contrast: "#FFFFFF",
    contrastLight: "#000000",
    inactive: "#808080",
    disabled: "#333333",
    componentBackground: "#F7F2FE",
    error: "#FF3333",
    rideScore: {
      0: "#D6D2DC",
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
