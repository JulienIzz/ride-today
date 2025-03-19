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
    s: 2,
    m: 4,
    l: 8,
    xl: 16,
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
    tagline: 40,
  },
  fonts: {
    regular: "Montserrat_400Regular",
    semiBold: "Montserrat_600SemiBold",
    bold: "Montserrat_700Bold",
  },
} as const;

const darkThemeObject = {
  colors: {
    mainBackground: "#1F1F1F",
    primary: "#C8FF33",
    contrast: "#000000",
    contrastLight: "#FFFFFF",
    inactive: "#808080",
    disabled: "#333333",
    componentBackground: "#313131",
    white: "#FFFFFF",
  },
  ...commonTheme,
};

const lightThemeObject = {
  colors: {
    mainBackground: "#F5F5F5",
    primary: "#7F33FF",
    contrast: "#FFFFFF",
    contrastLight: "#000000",
    inactive: "#808080",
    disabled: "#333333",
    componentBackground: "#F7F2FE",
    white: "#FFFFFF",
  },
  ...commonTheme,
};

export type Theme = typeof darkThemeObject;

export const lightTheme: Theme = lightThemeObject;

export const darkTheme: Theme = darkThemeObject;
