import { Router, RootRoute, Route } from "@tanstack/react-router";

import {
  CHAT_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  ROOT_ROUTE,
} from "../constants/routes.ts";

import Chat from "../pages/Chat/index.tsx";
import Index from "../pages/Index/index.tsx";
import Root from "../pages/Root/index.tsx";
import Register from "../pages/Register/index.tsx";
import Login from "../pages/Login/index.tsx";

const rootRoute = new RootRoute({
  component: Root,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: ROOT_ROUTE,
  component: Index,
});

const chatRoute = new Route({
  getParentRoute: () => rootRoute,
  path: CHAT_ROUTE,
  component: Chat,
});

const registerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: REGISTER_ROUTE,
  component: Register,
});

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: LOGIN_ROUTE,
  component: Login,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  chatRoute,
  registerRoute,
  loginRoute,
]);

export const router = new Router({ routeTree });
