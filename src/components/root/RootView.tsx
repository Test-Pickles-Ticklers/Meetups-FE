import { Outlet } from 'react-router-dom';
import Navbar from './navbar/Navbar';

const RootView = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default RootView;
