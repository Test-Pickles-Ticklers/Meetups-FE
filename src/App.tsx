import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import Provider from "./providers/Provider";

function App() {
  return (
    <Provider>
      <div
        className="App"
        style={{ display: "grid" }}
      >
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}

export default App;
