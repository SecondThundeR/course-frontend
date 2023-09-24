import { memo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ROOT_ROUTE } from '../constants/routes';

import HomePage from '../pages/Home.page';
import Root from '../pages/Root.page';

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
]);

export const Router = memo(() => <RouterProvider router={router} />);
