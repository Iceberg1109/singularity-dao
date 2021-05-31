import React from "react";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";

// export * from '../components'

export function colors(darkMode) {
  return {
    // base
    white: "#FFFFFF",
    black: "#000000",

    default: darkMode ? "#00E6CC" : "#000000",

    gray: "#8898AA",
    gray1: "#ADB5BD",
    gray2: "#6C6C6C",
    gray3: "#828282",
    gray80: "#545454",
    gray100: "#212121",
    grayLight: "#F4F4F4",

    blue60: "#005AFF",

    purple: "rgba(65, 0, 202, 1)",

    success: "#2DCE89",

    gradient1: "linear-gradient(90deg, #4100CA 0%, #224BDB 100%)",
    gradient2: "linear-gradient(90deg, #2DE4C5 0%, #224BDB 100%)",

    // backgrounds / greys
    bg1: "#212429",

    //primary colors
    primary1: "#11CDEF",

    // secondary colors
    secondary1: "#2172E5",

    // other
    red1: "#FD4040",
    pink1: "#FA00FF",
    danger: "#F5365C",
    interactive2: darkMode ? "#00E6CC" : "#7800FF",
    interactive3: darkMode ? "#00E6CC" : "#7800FF",

    text1: darkMode ? "#F0F0F0" : "#212121",
    text2: darkMode ? "#6c6c6c" : "#6c6c6c",
    text5: darkMode ? "#ABABAB" : "#ABABAB",

    link1: darkMode ? "#00E6CC" : "#7800FF",
    violet0: darkMode ? "#F3F1FF" : "#F3F1FF",

    // default colors
    text10: darkMode ? "#ffffff" : "#000000",
    bg10: darkMode ? "#000000" : "#ffffff",
  };
}

// export function colors() {
//   return {
//     // base
//     white: "#FFFFFF",
//     black: "#000000",

//     default: "#00E6CC",

//     gray: "#8898AA",
//     gray1: "#ADB5BD",
//     gray2: "#6C6C6C",
//     gray3: "#828282",
//     gray100: "#212121",
//     grayLight: "#F4F4F4",

//     purple: "rgba(65, 0, 202, 1)",

//     success: "#2DCE89",

//     gradient1: "rgba(33, 33, 33, 0.75)",
//     gradient2: "linear-gradient(90deg, #2DE4C5 0%, #224BDB 100%)",

//     // backgrounds / greys
//     bg1: "#212429",

//     //primary colors
//     primary1: "#11CDEF",

//     // secondary colors
//     secondary1: "#2172E5",

//     // other
//     red1: "#FD4040",
//     pink1: "#FA00FF",
//     danger: "#F5365C",
//   };
// }

export function theme() {
  return {
    color: { ...colors() },

    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },
  };
}

export default function ThemeProvider({ children }) {
  return (
    <StyledComponentsThemeProvider theme={theme()}>
      {children}
    </StyledComponentsThemeProvider>
  );
}
