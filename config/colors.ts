export const themeColors = {
  pink: {
    name: "pink",
    primary: "#C13366",
    secondary: "#D13970",
    light: "#F8F6F7",
    dark: "#1A1718",
  },
  red: {
    name: "red",
    primary: "#D10002",
    secondary: "#E50003",
    light: "#F8F6F6",
    dark: "#1A1717",
  },
  orange: {
    name: "orange",
    primary: "#E55501",
    secondary: "#F25E01",
    light: "#F8F7F6",
    dark: "#1A1817",
  },
  green: {
    name: "green",
    primary: "#336B2E",
    secondary: "#367D2E",
    light: "#F6F7F6",
    dark: "#171817",
  },
  blue: {
    name: "blue",
    primary: "#335687",
    secondary: "#3761AA",
    light: "#F6F6F7",
    dark: "#171718",
  },
  purple: {
    name: "purple",
    primary: "#673589",
    secondary: "#6E3794",
    light: "#F7F6F7",
    dark: "#181718",
  },
} as const;

export type ThemeColor = keyof typeof themeColors;
