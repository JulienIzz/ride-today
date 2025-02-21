export const themeObject = {
  colors: {
    white: "#FFFFFF",
    black: "#000000",
  },
  spacing: {
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
    sm: 2,
    md: 4,
    lg: 8,
    xl: 16,
    round: 9999,
  },
  fontSizes: {
    "3xs": 8,
    "2xs": 10,
    xs: 12,
    s: 14,
    m: 16,
    l: 18,
    xl: 24,
  },
} as const;

export type Theme = typeof themeObject;

export const theme: Theme = themeObject;
