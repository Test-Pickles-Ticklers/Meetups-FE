import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import { SnackbarProvider } from "notistack";
import GlobalStyles from "@mui/material/GlobalStyles";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
