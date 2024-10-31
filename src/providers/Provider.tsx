import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider } from "styled-components";
import { UserProvider } from "../context/UserContext";
import theme from "../theme/theme";
import { SnackbarProvider } from "notistack";
import { StyledEngineProvider } from "@mui/material";

interface ProviderProps {
  children: React.ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <UserProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={4}>{children}</SnackbarProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </UserProvider>
    </LocalizationProvider>
  );
};

export default Provider;
