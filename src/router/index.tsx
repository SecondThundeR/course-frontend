import { Router, RootRoute, Route } from "@tanstack/react-router";

import Chat from "../components/Chat/index.tsx";
import Index from "../components/Index/index.tsx";
import Root from "../components/Root/index.tsx";
import Register from "../components/Register/index.tsx";
import Login from "../components/Login/index.tsx";

const rootRoute = new RootRoute({
  component: Root,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Index,
});

const chatRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/chat",
  component: Chat,
});

const registerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: Register,
});

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  chatRoute,
  registerRoute,
  loginRoute,
]);

export const router = new Router({ routeTree });
