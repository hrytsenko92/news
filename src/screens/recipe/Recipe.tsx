import { ChangeEvent, FC, useState } from "react";
import { apiLoader } from "../../loaders/apiLoader";
import { RecipeListItem } from "../../components/recipe/recipeList/RecipeListItem";
import { RecipeForm } from "../../components/recipe/form/RecipeForm";
import { RecipeListType, Result } from "../../types/recipeList";
import style from './recipe.module.scss';
// import { defer, useLoaderData } from "react-router-dom";

// export const randomRecipeLoader = async () => {
//   const request = `https://api.spoonacular.com/recipes/random?apiKey=1e23ac7b985f4eef8bddaa18559163d9&number=20`
//   const randomRecipeData = await apiLoader(request);
//   return defer({ randomRecipeData });
// };

export const Recipe: FC = () => {
  // const { randomRecipeData } = useLoaderData();
  const [recipeTitle, setRecipeTitle] = useState<string>("");
  const [recipeData, setRecipeData] = useState<RecipeListType>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await apiLoader(
      `https://api.spoonacular.com/recipes/complexSearch?query=${recipeTitle}&apiKey=1e23ac7b985f4eef8bddaa18559163d9&number=20`
    );
    setRecipeData(result);
    setRecipeTitle("");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTimeout(() => {
      setRecipeTitle(value);
    }, 100);
    // check for null/undefined and str.find
  };

  const clearInput = () => {
    setRecipeTitle("");
  };
// console.log(randomRecipeData)
  return (
    <div className={style.container}>
      <RecipeForm
        handleSubmit={handleSubmit}
        recipeTitle={recipeTitle}
        clearInput={clearInput}
        handleChange={handleChange}
      />
      <div className={style.list}>
        {recipeData !== undefined
          ? recipeData.results.map((item: Result) => <RecipeListItem data={item} key={item.id}/>)
          : null}
      </div>
    </div>
  );
};
