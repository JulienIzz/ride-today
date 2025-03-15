export const themeObject = {
  colors: {
    mainBackground: "#1F1F1F",
    primary: "#C8FF33",
    contrast: "#000000",
    contrastLight: "#FFFFFF",
    disabled: "#808080",
    componentBackground: "#313131",
  },
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
    title: "Montserrat_700Bold",
  },
} as const;

export type Theme = typeof themeObject;

export const theme: Theme = themeObject;
