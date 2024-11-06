export const themeColors = {
  pink: {
    name: "Pink",
    primary: "#AB2D5A",
    secondary: "#D13970",
    light: "#FEF8FA",
    dark: "#0C0506",
  },
  red: {
    name: "Red",
    primary: "#B80002",
    secondary: "#E50003",
    light: "#FEF8F9",
    dark: "#0C0506",
  },
  orange: {
    name: "Orange",
    primary: "#CE4B01",
    secondary: "#F25E01",
    light: "#FEFAF8",
    dark: "#0C0605",
  },
  green: {
    name: "Green",
    primary: "#2D5A27",
    secondary: "#367D2E",
    light: "#F8FEFA",
    dark: "#050C06",
  },
  blue: {
    name: "Blue",
    primary: "#2D4B7A",
    secondary: "#3761AA",
    light: "#F8FAFE",
    dark: "#05060C",
  },
  purple: {
    name: "Purple",
    primary: "#5B2D7A",
    secondary: "#6E3794",
    light: "#FAF8FE",
    dark: "#0A050C",
  },
} as const;

export type ThemeColor = keyof typeof themeColors;
