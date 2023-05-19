"use client";
import { createTheme } from "@mui/material/styles";
import { Chakra_Petch } from "next/font/google";

export const chakraPetch = Chakra_Petch({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const mainTheme = createTheme({
  palette: {
    primary: {
      main: "#2962ff",
    },
    secondary: {
      main: "#fff",
      contrastText: "#2962ff",
    },
    error: {
      main: "#ff1744",
    },
  },
  typography: {
    fontFamily: chakraPetch.style.fontFamily,
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
