import { createBrowserRouter } from "react-router-dom";
import { App } from "./App.tsx";
import { ErrorPage } from "./screens/errorPage/ErrorPage.tsx";
import { News, newsDataLoader } from "./screens/news/News.tsx";
import { Weather } from "./screens/weather/Weather.tsx";
import { Exchange } from "./screens/exchange/Exchange.tsx";
import { Recipe } from "./screens/recipe/Recipe.tsx";
import {
  RecipeCard,
  singleRecipeLoader,
} from "./components/recipe/recipeCard/RecipeCard.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <News />,
        loader: newsDataLoader,
      },
      {
        path: "news",
        element: <News />,
        loader: newsDataLoader,
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
      },
      {
        path: "recipe/:id",
        element: <RecipeCard />,
        loader: singleRecipeLoader,
      },
    ],
  },
]);
