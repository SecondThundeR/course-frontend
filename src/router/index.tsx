import { memo, lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { CHAT_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, ROOT_ROUTE } from '@/constants/routes';

const Chat = lazy(() => import('../pages/Chat.page'));
const Home = lazy(() => import('../pages/Home.page'));
const Login = lazy(() => import('../pages/Login.page'));
const Register = lazy(() => import('../pages/Register.page'));
const Root = lazy(() => import('../pages/Root.page'));

const router = createBrowserRouter([
  {
    path: ROOT_ROUTE,
    element: (
      <Suspense fallback={null}>
        <Root />
      </Suspense>
    ),
    children: [
      {
        path: ROOT_ROUTE,
        element: (
          <Suspense fallback={null}>
            <Home />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: LOGIN_ROUTE,
    element: (
      <Suspense fallback={null}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: REGISTER_ROUTE,
    element: (
      <Suspense fallback={null}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: CHAT_ROUTE,
    element: (
      <Suspense fallback={null}>
        <Chat />
      </Suspense>
    ),
  },
]);

export const Router = memo(() => <RouterProvider router={router} />);
