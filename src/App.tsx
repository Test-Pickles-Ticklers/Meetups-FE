import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import "typeface-roboto";
import GlobalStyles from "@mui/material/GlobalStyles";
import Provider from "./providers/Provider";


function App() {
  return (
    <Provider>
      <GlobalStyles
        styles={{
          body: {
            margin: 0,
            padding: 0,
            background: "linear-gradient(to bottom, #4a90e2, #d9e9f2)",
            backgroundRepeat: "no-repeat",
            height: "100vh",
          },
        }}
      />

      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
