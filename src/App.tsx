import { RouterProvider } from 'react-router-dom';
import router from './routes/Routes';
import PageLoader from './components/root/pageLoader/PageLoader';

function App() {
  return (
    <>
      <RouterProvider router={router} fallbackElement={<PageLoader />} />
    </>
  );
}

export default App;
