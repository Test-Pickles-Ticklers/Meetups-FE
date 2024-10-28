import { createBrowserRouter } from 'react-router-dom';
import RootView from '../components/root/RootView';
import HomeView from '../components/home/HomeView';
import MeetupsView from '../components/meetups/MeetupsView';

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
        element: <MeetupsView />,
      },
    ],
  },
]);

export default router;
