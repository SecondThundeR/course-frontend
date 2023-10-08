import { memo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { CHAT_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, ROOT_ROUTE } from '@/constants/routes';

import Chat from '@/pages/Chat.page';
import Home from '@/pages/Home.page';
import Login from '@/pages/Login.page';
import Register from '@/pages/Register.page';
import Root from '@/pages/Root.page';

const router = createBrowserRouter([
  {
    path: ROOT_ROUTE,
    element: <Root />,
    children: [
      {
        path: ROOT_ROUTE,
        element: <Home />,
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
  {
    path: CHAT_ROUTE,
    element: <Chat />,
  },
]);

export const Router = memo(() => <RouterProvider router={router} />);
