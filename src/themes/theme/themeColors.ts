import { PaletteColorOptions } from "@mui/material/styles";
import { PaletteThemeProps, ThemeMode } from "../types/theme";
import { PalettesProps } from "@ant-design/colors";

const ThemeColors = (
  colors: PalettesProps,
  mode: ThemeMode
): PaletteThemeProps => {
  const { grey } = colors;
  const greyColors: PaletteColorOptions = {
    0: grey[0],
    50: grey[1],
    100: grey[2],
    200: grey[3],
    300: grey[4],
    400: grey[5],
    500: grey[6],
    600: grey[7],
    700: grey[8],
    800: grey[9],
    900: grey[10],
    A50: grey[15],
    A100: grey[11],
    A200: grey[12],
    A400: grey[13],
    A700: grey[14],
    A800: grey[16],
  };
  const contrastText = "#fff";

  let primaryColors = ["#85a4d6", "#517dc5", "#314b76"];
  const secondaryColors = ["#e1a9a5", "#da938f", "#ae7672"];
  let infoColors = ["#d7c988", "#cdbb6a", "#a49655"];
  let errorColors = ["#F25E52", "#F04134", "#EE3B2F"];
  let warningColors = ["#FFC926", "#FFBF00", "#FFB900"];
  let successColors = ["#26B56E", "#00A854", "#00A04D"];

  if (mode === ThemeMode.DARK) {
    let primaryColors = ["#9eb6df", "#7497d1", "#5d79a7"];
    // primaryColors = ["#655488", "#523f79", "#3f2a6b"];
    errorColors = ["#7d2e28", "#d13c31", "#e66859"];
    warningColors = ["#836611", "#dda705", "#e9bf28"];
    infoColors = ["#11595f", "#058e98", "#1ea6aa"];
    successColors = ["#115c36", "#05934c", "#1da65d"];
  }

  return {
    primary: {
      light: primaryColors[0],
      main: primaryColors[1],
      dark: primaryColors[2],
      contrastText,
    },
    secondary: {
      light: secondaryColors[0],
      main: secondaryColors[1]!,
      dark: secondaryColors[2],
      contrastText: greyColors[50],
    },
    error: {
      light: errorColors[0],
      main: errorColors[1],
      dark: errorColors[2],
      contrastText,
    },
    warning: {
      light: warningColors[0],
      main: warningColors[1],
      dark: warningColors[2],
      contrastText: greyColors[100],
    },
    info: {
      light: infoColors[0],
      main: infoColors[1],
      dark: infoColors[2],
      contrastText,
    },
    success: {
      light: successColors[0],
      main: successColors[1],
      dark: successColors[2],
      contrastText,
    },
    grey: greyColors,
  };
};

export default ThemeColors;
