import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import "typeface-roboto";
import { UserProvider } from "./context/UserContext";
import GlobalStyles from "@mui/material/GlobalStyles";

function App() {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles
          styles={{
            body: {
              margin: 0,
              padding: 0,
              background: "linear-gradient(to bottom, #4a90e2, #d9e9f2)",
              height: "100vh",
              overflow: "hidden",
            },
            html: {
              margin: 0,
              padding: 0,
              height: "100%",
            },
          }}
        />
        <SnackbarProvider maxSnack={4}>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
