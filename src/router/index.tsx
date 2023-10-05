import { memo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { LOGIN_ROUTE, REGISTER_ROUTE, ROOT_ROUTE } from '@/constants/routes';

import HomePage from '@/pages/Home.page';
import Root from '@/pages/Root.page';
import Login from '@/pages/Login.page';
import Register from '@/pages/Register.page';

const router = createBrowserRouter([
  {
    path: ROOT_ROUTE,
    element: <Root />,
    children: [
      {
        path: ROOT_ROUTE,
        element: <HomePage />,
      },
    ],
  },
  {
    path: LOGIN_ROUTE,
    element: <Login />,
  },
  {
    path: REGISTER_ROUTE,
    element: <Register />,
  },
]);

export const Router = memo(() => <RouterProvider router={router} />);
