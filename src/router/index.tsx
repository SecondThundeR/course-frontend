import { memo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import {
  ANY_ROUTE,
  CHAT_ID_ROUTE,
  CHAT_ROUTE,
  ANONYMOUS_CHAT_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  ROOT_ROUTE,
} from '@/constants/routes';

const router = createBrowserRouter([
  {
    path: ROOT_ROUTE,
    lazy: () => import('../pages/Root.page'),
    children: [
      {
        index: true,
        lazy: () => import('../pages/Home.page'),
      },
    ],
  },
  {
    path: LOGIN_ROUTE,
    lazy: () => import('../pages/Login.page'),
  },
  {
    path: REGISTER_ROUTE,
    lazy: () => import('../pages/Register.page'),
  },
  {
    path: CHAT_ROUTE,
    lazy: () => import('../pages/Chat.page'),
    children: [
      {
        index: true,
        lazy: () => import('../pages/ChatIndex.page'),
      },
      {
        path: CHAT_ID_ROUTE,
        lazy: () => import('../pages/ChatConversation.page'),
      },
    ],
  },
  {
    // This is an experimental route and shouldn't be used for real conversations
    path: ANONYMOUS_CHAT_ROUTE,
    lazy: () => import('../pages/AnonymousChat.page'),
  },
  {
    path: ANY_ROUTE,
    lazy: () => import('../pages/NotFound.page'),
  },
]);

export const Router = memo(() => <RouterProvider router={router} />);
