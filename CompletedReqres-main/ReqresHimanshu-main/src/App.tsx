import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainComponent from './Pages/MainComponent';
import ListUsers from './Pages/ListUsers';
import SingleUser from './Pages/SingleUser';
import CreateUser from './Pages/CreateUser';
import UpdateUser from './Pages/UpdateUser';
import Register from './Pages/Register';
import Login from './Pages/Login';

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainComponent />,
      children: [
        {
          path: '/listUsers',
          element: <ListUsers />,
        },
        {
          path: '/singleUser',
          element: <SingleUser />,
        },
        {
          path: '/createUser',
          element: <CreateUser />,
        },
        {
          path: '/updateUser',
          element: <UpdateUser />,
        },
        {
          path: '/register',
          element: <Register />,
        },
        {
          path: '/login',
          element: <Login />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
