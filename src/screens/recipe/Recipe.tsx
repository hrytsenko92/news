import { ChangeEvent, FC, useState } from "react";
import { apiLoader } from "../../loaders/apiLoader";
import { RecipeListItem } from "../../components/recipe/recipeList/RecipeListItem";
import { RecipeForm } from "../../components/recipe/form/RecipeForm";
import { RecipeListType, Result } from "../../types/recipeList";
import style from "./recipe.module.scss";

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
    recipeTitle.length < 25 ? setTimeout(() => {
      setRecipeTitle(value);
    }, 50) : null;
    // check for null/undefined and str.find
  };

  const clearInput = () => {
    setRecipeTitle("");
  };

  return (
    <div className={style.container}>
      <div className={style.formWrapper}>
        <p className={style.title}>Find your favorite recipe...</p>
        <RecipeForm
        handleSubmit={handleSubmit}
        recipeTitle={recipeTitle}
        clearInput={clearInput}
        handleChange={handleChange}
      />
      </div>
      <div className={style.list}>
        {recipeData !== undefined && Object.hasOwn(recipeData, 'results') ? (
          recipeData.results.map((item: Result) => (
            <RecipeListItem data={item} key={item.id} />
          ))
        )  : null}
      </div>
    </div>
  );
};
