import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { UserProvider } from "../context/UserContext";
import { SnackbarProvider } from "notistack";
import ThemeCustomization from "../themes/themeCustomization";
import "dayjs/locale/sv";

interface ProviderProps {
  children: React.ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="sv"
    >
      <UserProvider>
        <ThemeCustomization>
          <SnackbarProvider maxSnack={4}>{children}</SnackbarProvider>
        </ThemeCustomization>
      </UserProvider>
    </LocalizationProvider>
  );
};

export default Provider;
