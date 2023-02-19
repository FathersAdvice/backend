import App from "./App";
import { ErrorPage, GraphQlServer, AuthPage } from "./pages";
import React from "react";

export default [
  {
    path: "/",
    element: <AuthPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/fathers-advice",
    element: <App />,
  },
  {
    path: "/graph-ql-server",
    element: <GraphQlServer />,
  },
];
