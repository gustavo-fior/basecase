export const themeColors = {
  red: {
    name: "red",
    primary: "#D10002",
    secondary: "#E50003",
    light: "#FDF5F5",
    dark: "#131111",
  },
  pink: {
    name: "pink",
    primary: "#C13366",
    secondary: "#D13970",
    light: "#FDF6F8",
    dark: "#151415",
  },
  orange: {
    name: "orange",
    primary: "#EBA418",
    secondary: "#FBB428",
    light: "#FDF9F5",
    dark: "#1A1817",
  },
  yellow: {
    name: "yellow",
    primary: "#EDCF46",
    secondary: "#FFE04B",
    light: "#FDFBF5",
    dark: "#1A1817",
  },
  green: {
    name: "green",
    primary: "#56C7A6",
    secondary: "#67D8B7",
    light: "#F5FCFA",
    dark: "#171817",
  },
  blue: {
    name: "blue",
    primary: "#6BC0D7",
    secondary: "#7CCEE5",
    light: "#F5FAFC",
    dark: "#171718",
  },
  purple: {
    name: "purple",
    primary: "#9189E3",
    secondary: "#A29BF4",
    light: "#F8F5FC",
    dark: "#151415",
  },

} as const;

export type ThemeColor = keyof typeof themeColors;
