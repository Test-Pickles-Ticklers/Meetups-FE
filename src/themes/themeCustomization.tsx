import {
  CssBaseline,
  StyledEngineProvider,
  useMediaQuery,
} from "@mui/material";
import {
  createTheme,
  type Theme,
  type ThemeOptions,
  ThemeProvider,
  type TypographyVariantsOptions,
} from "@mui/material/styles";
import { createContext, ReactNode, useMemo, useState } from "react";

import Palette from "./palette";
import { CustomShadowProps, ThemeMode } from "./types/theme";
import CustomShadows from "./shadows";
import Typography from "./typography";

import componentsOverride from "./overrides";

interface ThemeCustomizationProps {
  children: ReactNode;
}

export const ThemeContext = createContext({
  toggleThemeMode: () => {},
});

export default function ThemeCustomization({
  children,
}: ThemeCustomizationProps) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [mode, setMode] = useState<ThemeMode.LIGHT | ThemeMode.DARK>(
    prefersDarkMode || localStorage.getItem("ThemeMode") === ThemeMode.LIGHT
      ? ThemeMode.LIGHT
      : ThemeMode.DARK
  );

  const themeMode = useMemo(
    () => ({
      toggleThemeMode: () => {
        setMode((prevMode) => {
          const newMode =
            prevMode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT;
          localStorage.setItem("ThemeMode", newMode);
          return newMode;
        });
      },
    }),
    []
  );

  const theme: Theme = useMemo<Theme>(() => Palette(mode), [mode]);

  const themeTypography: TypographyVariantsOptions =
    useMemo<TypographyVariantsOptions>(() => Typography(), []);

  const themeCustomShadows: CustomShadowProps = useMemo<CustomShadowProps>(
    () => CustomShadows(theme),
    [theme]
  );

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      breakpoints: {
        values: {
          xs: 0,
          sm: 868,
          md: 1224,
          lg: 1640,
          xl: 1840,
        },
      },
      mixins: {
        toolbar: {
          minHeight: 60,
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
      palette: theme.palette,
      customShadows: themeCustomShadows,
      typography: themeTypography,
    }),
    [theme, themeTypography, themeCustomShadows]
  );

  const themes: Theme = createTheme(themeOptions);
  themes.components = componentsOverride(themes);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeContext.Provider value={themeMode}>
        <ThemeProvider theme={themes}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ThemeContext.Provider>
    </StyledEngineProvider>
  );
}
