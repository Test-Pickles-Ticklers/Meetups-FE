import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider } from "styled-components";
import { UserProvider } from "../context/UserContext";
import theme from "../theme/theme";
import { SnackbarProvider } from "notistack";

interface ProviderProps {
  children: React.ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <UserProvider>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={4}>{children}</SnackbarProvider>
        </ThemeProvider>
      </UserProvider>
    </LocalizationProvider>
  );
};

export default Provider;
