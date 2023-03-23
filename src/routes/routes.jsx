import React from "react";
import { useRoutes } from "hookrouter";
import { PlaygroundPage } from "../pages/PlaygroundPage";
import { HomePage } from "../pages/HomePage";
import { LessonPage } from "../pages/LessonPage";
import { NotFoundPage } from "../pages/NotFoundPage";
const routes = {
  "/": () => <HomePage />,
  "/lesson": () => <LessonPage />,
  "/playground": () => <PlaygroundPage />,
};

export const Routes = () => {
  const routeResult = useRoutes(routes);
  return routeResult || <PlaygroundPage />;
};
