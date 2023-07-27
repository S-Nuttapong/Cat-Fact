import { theme as baseTheme, extendTheme } from "@chakra-ui/react";
import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

const primary = {
  50: "#f7f6fe",
  100: "#e0ddfb",
  200: "#c4c0f8",
  300: "#a39cf4",
  400: "#9087f1",
  500: "#756bee",
  600: "#5f54e1",
  700: "#4d43b5",
  800: "#413999",
  900: "#2f296f"
}

const neutral = {
  50: "#F5F7FA",
  100: "#E4E7EB",
  200: "#CBD2D9",
  300: "#9AA5B1",
  400: "#7B8794",
  500: "#616E7C",
  600: "#52606D",
  700: "#3E4C59",
  800: "#323F4B",
  900: "#1F2933",
};

const buttonTheme = defineStyleConfig({
  variants: {
    primary: defineStyle({
      border: 'unset',
      bg: 'button.primary',
      color: 'gray.50',
      _hover: {
        opacity: 0.8,
        _disabled: {
          bg: 'button.primary',
        },
      },
      _focus: {
        boxShadow: 'outline',
      },
      _disabled: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    }),
    outline: defineStyle({
      bg: 'transparent',
      borderColor: 'button.primary',
      color: 'button.primary',
      _hover: {
        bg: primary[50],
        _disabled: {
          bg: 'transparent',
        },
      },
      _focus: {
        bg: primary[200],
        boxShadow: 'outline',
      },
      _disabled: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    })
  }
})

export const theme = extendTheme(
  {
    colors: {
      primary,
      neutral,
      bg: {
        primary: primary[900],
      },
      border: {
        primary: neutral[50],
      },
      content: {
        primary: neutral[50],
        form: neutral[300],
      },
      button: {
        primary: primary[600],
      },
    },
    fonts: {
      body: "Poppins, sans-serif",
      heading: "Poppins, sans-serif",
      mono: "Poppins, monospace",
    },
    fontSizes: {
      "xx-small": "0.625rem",
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.5rem",
      xxl: "2rem",
    },
    fontWeights: {
      normal: 400,
      semibold: 450,
      medium: 500,
      bold: 700,
    },
    lineHeights: {
      normal: "normal",
      none: "1",
      shorter: "1.25",
      short: "1.375",
      base: "1.5",
      tall: "1.625",
      taller: "2",
    },
    letterSpacings: {
      tighter: "-0.05em",
      tight: "-0.025em",
      normal: "0",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em",
    },
    components: {
      Button: buttonTheme
    },
  },
  baseTheme
);
