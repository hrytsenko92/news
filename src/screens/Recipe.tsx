import { FC, Suspense, useState } from "react";
import { apiLoader } from "../api/apiLoader";
import { RecipeDataType } from "../types/recipeDataType";
import { defer, useLoaderData, Await } from "react-router-dom";
import { RecipeCard } from "../components/recipe/RecipeCard";

export const recipeDataLoader = async () => {
  const request = `https://api.spoonacular.com/recipes/random?apiKey=0afa93738442485b838d72cc82b04f5b&number=50`;
  const data: RecipeDataType = await apiLoader(request);
  return defer({ data });
};

export const Recipe: FC = () => {
  const { data } = useLoaderData();
  const [isOpen, setIsOpen] = useState(false);
  console.log(data.recipes);
  return (
    <Suspense fallback={<p>suspense loading...</p>}>
      <Await
        resolve={data}
        errorElement={<p>error...</p>}
        children={(data) => (data.recipes.map((item) => (<RecipeCard data={item} key={item.id} open={item.id} />)))}
      />
    </Suspense>
  );
};
