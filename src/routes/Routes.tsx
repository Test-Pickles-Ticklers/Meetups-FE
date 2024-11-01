import { createBrowserRouter } from "react-router-dom";
import RootView from "../components/root/RootView";
import HomeView from "../components/home/HomeView";
import MeetupsView from "../components/meetups/MeetupsView";
import UserView from "../components/user/UserView";
import ProtectedRoute from "./ProtectedRoute";
import MeetupView from "../components/meetups/meetup/MeetupView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootView />,
    children: [
      {
        path: "",
        element: <HomeView />,
      },
      {
        path: "meetups",
        element: <ProtectedRoute element={<MeetupsView />} />,
      },
      {
        path: "meetups/:id",
        element: <ProtectedRoute element={<MeetupView />} />,
      },
      {
        path: "user",
        element: <ProtectedRoute element={<UserView />} />,
      },
    ],
  },
]);

export default router;
