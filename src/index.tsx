import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App.tsx";
import { ErrorPage } from "./screens/ErrorPage.tsx";
import { News, dataLoader} from "./screens/News.tsx";
import { Weather } from "./screens/Weather.tsx";
import { Currency } from "./screens/Currency.tsx";
import { Recipe } from "./screens/Recipe.tsx";
import { HistoryFacts } from "./screens/HistoryFacts.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "news",
        element: <News />,
        loader: dataLoader,
        index: true,
      },
      {
        path: "weather",
        element: <Weather />,
      },
      {
        path: "currency",
        element: <Currency />,
      },
      {
        path: "recipe",
        element: <Recipe />,
      },
      {
        path: "historyFacts",
        element: <HistoryFacts />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
