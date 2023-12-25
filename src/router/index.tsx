import { memo, lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import {
  ANY_ROUTE,
  CHAT_ID_ROUTE,
  CHAT_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  ROOT_ROUTE,
} from '@/constants/routes';

const LazyChat = lazy(() => import('../pages/Chat.page'));
const LazyChatConversation = lazy(() => import('../pages/ChatConversation.page'));
const LazyChatIndex = lazy(() => import('../pages/ChatIndex.page'));
const LazyHome = lazy(() => import('../pages/Home.page'));
const LazyLogin = lazy(() => import('../pages/Login.page'));
const LazyNotFound = lazy(() => import('../pages/NotFound.page'));
const LazyRegister = lazy(() => import('../pages/Register.page'));
const LazyRoot = lazy(() => import('../pages/Root.page'));

const router = createBrowserRouter([
  {
    path: ROOT_ROUTE,
    element: (
      <Suspense>
        <LazyRoot />
      </Suspense>
    ),
    children: [
      {
        path: ROOT_ROUTE,
        element: (
          <Suspense>
            <LazyHome />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: LOGIN_ROUTE,
    element: (
      <Suspense>
        <LazyLogin />
      </Suspense>
    ),
  },
  {
    path: REGISTER_ROUTE,
    element: (
      <Suspense>
        <LazyRegister />
      </Suspense>
    ),
  },
  {
    path: CHAT_ROUTE,
    element: (
      <Suspense>
        <LazyChat />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <LazyChatIndex />
          </Suspense>
        ),
      },
      {
        path: CHAT_ID_ROUTE,
        element: (
          <Suspense>
            <LazyChatConversation />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: ANY_ROUTE,
    element: (
      <Suspense>
        <LazyNotFound />
      </Suspense>
    ),
  },
]);

export const Router = memo(() => <RouterProvider router={router} />);
