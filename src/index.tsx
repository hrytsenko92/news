import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, defer, RouterProvider } from "react-router-dom";
import { App } from "./App.tsx";
import { ErrorPage } from "./screens/ErrorPage.tsx";
import { News, dataLoader} from "./screens/News.tsx";
import { Weather } from "./screens/Weather.tsx";
import { Exchange } from "./screens/Exchange.tsx";
import { Recipe, recipeDataLoader } from "./screens/Recipe.tsx";

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
        path: "exchange",
        element: <Exchange />,
      },
      {
        path: "recipe",
        element: <Recipe />,
        loader: recipeDataLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
