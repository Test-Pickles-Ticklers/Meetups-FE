import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider maxSnack={4}>
      <RouterProvider router={router} />
    </SnackbarProvider>
  );
}

export default App;
