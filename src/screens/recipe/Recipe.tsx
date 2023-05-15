import { ChangeEvent, FC, useState } from "react";
import { apiLoader } from "../../loaders/apiLoader";
import { RecipeList } from "../../components/recipe/recipeList/RecipeList";
import { RecipeForm } from "../../components/recipe/form/RecipeForm";
import { RecipeListType, Result } from "../../types/recipeList";
import style from './recipe.module.scss';

export const Recipe: FC = () => {
  const [recipeTitle, setRecipeTitle] = useState<string>("");
  const [recipeData, setRecipeData] = useState<RecipeListType>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await apiLoader(
      `https://api.spoonacular.com/recipes/complexSearch?query=${recipeTitle}&apiKey=0afa93738442485b838d72cc82b04f5b&number=20`
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

  return (
    <div>
      <RecipeForm
        handleSubmit={handleSubmit}
        recipeTitle={recipeTitle}
        clearInput={clearInput}
        handleChange={handleChange}
      />
      <div>
        {recipeData !== undefined
          ? recipeData.results.map((item: Result) => <RecipeList data={item} key={item.id}/>)
          : null}
      </div>
    </div>
  );
};
