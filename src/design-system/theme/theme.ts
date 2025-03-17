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
    "3xs": 8,
    "2xs": 12,
    xs: 14,
    s: 16,
    m: 18,
    l: 20,
    xl: 24,
    title: 40,
  },
  fonts: {
    body: "Montserrat_400Regular",
    bodyBold: "Montserrat_600SemiBold",
    title: "Montserrat_700Bold",
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
  },
  ...commonTheme,
};

const lightThemeObject = {
  colors: {
    mainBackground: "#F5F5F5",
    primary: "#D6420F",
    contrast: "#FFFFFF",
    contrastLight: "#000000",
    inactive: "#808080",
    disabled: "#333333",
    componentBackground: "#C9C9C9",
  },
  ...commonTheme,
};

export type Theme = typeof lightThemeObject;

export const lightTheme: Theme = lightThemeObject;

export const darkTheme: Theme = darkThemeObject;
