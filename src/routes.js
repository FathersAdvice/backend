import App from "./App";
import { ErrorPage, AuthPage } from "./pages";
import React from "react";

export default [
  {
    path: "/",
    element: <AuthPage />,
  },
  {
    path: "/fathers-advice",
    element: <App />,
  },
];
