import { memo, lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import {
  CHAT_ID_ROUTE,
  CHAT_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  ROOT_ROUTE,
} from '@/constants/routes';

const LazyChat = lazy(() => import('../pages/Chat.page'));
const LazyChatIndex = lazy(() => import('../pages/ChatIndex.page'));
const LazyHome = lazy(() => import('../pages/Home.page'));
const LazyLogin = lazy(() => import('../pages/Login.page'));
const LazyRegister = lazy(() => import('../pages/Register.page'));
const LazyRoot = lazy(() => import('../pages/Root.page'));

const router = createBrowserRouter([
  {
    path: ROOT_ROUTE,
    element: (
      <Suspense fallback={null}>
        <LazyRoot />
      </Suspense>
    ),
    children: [
      {
        path: ROOT_ROUTE,
        element: (
          <Suspense fallback={null}>
            <LazyHome />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: LOGIN_ROUTE,
    element: (
      <Suspense fallback={null}>
        <LazyLogin />
      </Suspense>
    ),
  },
  {
    path: REGISTER_ROUTE,
    element: (
      <Suspense fallback={null}>
        <LazyRegister />
      </Suspense>
    ),
  },
  {
    path: CHAT_ROUTE,
    element: (
      <Suspense fallback={null}>
        <LazyChat />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={null}>
            <LazyChatIndex />
          </Suspense>
        ),
      },
      {
        path: CHAT_ID_ROUTE,
        element: null,
      },
    ],
  },
]);

export const Router = memo(() => <RouterProvider router={router} />);
