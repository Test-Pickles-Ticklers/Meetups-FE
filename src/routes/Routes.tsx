<<<<<<< HEAD
import { createBrowserRouter } from 'react-router-dom';
import RootView from '../components/root/RootView';
import HomeView from '../components/home/HomeView';
import MeetupsView from '../components/meetups/MeetupsView';
import ProtectedRoute from './ProtectedRoute';
import UserView from '../components/user/UserView';
=======
import { createBrowserRouter } from "react-router-dom";
import RootView from "../components/root/RootView";
import HomeView from "../components/home/HomeView";
import MeetupsView from "../components/meetups/MeetupsView";
import UserView from "../components/user/UserView";
import ProtectedRoute from "./ProtectedRoute";
>>>>>>> 63c43ac42f67a87f8add0bd36690d80c838a999e

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootView />,
    children: [
      {
        path: '',
        element: <HomeView />,
      },
      {
        path: 'meetups',
        element: <ProtectedRoute element={<MeetupsView />} />,
      },
      {
        path: 'meetups/:id',
        element: <ProtectedRoute element={<MeetupsView />} />,
      },
      {
        path: 'user',
        element: <ProtectedRoute element={<UserView />} />,
      },
    ],
  },
]);

export default router;
