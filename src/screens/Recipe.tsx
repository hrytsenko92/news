import { FC, Suspense, useState } from "react";
import { apiLoader } from "../loaders/apiLoader";
import { RecipeDataType, Recipe as RecipeType } from "../types/recipeDataType";
import { defer, useLoaderData, Await } from "react-router-dom";
import { RecipeCard } from "../components/recipe/RecipeCard";

export const recipeDataLoader = async () => {
  const request = `https://api.spoonacular.com/recipes/random?apiKey=0afa93738442485b838d72cc82b04f5b&number=20`;
  const data: RecipeDataType = await apiLoader(request);
  return defer({ data });
};

export const Recipe: FC = () => {
  const { data } = useLoaderData();
  const [isOpen, setIsOpen] = useState<number>(0);
  const handleIsOpen = (id: number) => {
    setIsOpen(id)
  }
  return (
    <Suspense fallback={<p>suspense loading...</p>}>
      <Await
        resolve={data}
        errorElement={<p>error...</p>}
        children={(data) => (data.recipes.map((item: RecipeType) => (<RecipeCard data={item} key={item.id} isOpen={isOpen} handleIsOpen={handleIsOpen} />)))}
      />
    </Suspense>
  );
};
