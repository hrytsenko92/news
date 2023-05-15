import React from 'react';
import style from './recipeCard.module.scss';
import { apiLoader } from '../../../loaders/apiLoader';
import { useLoaderData, useNavigate } from 'react-router-dom';

export const singleRecipeLoader = async ({params}) => {
  const result = await apiLoader(`https://api.spoonacular.com/recipes/${params.id}/information?apiKey=0afa93738442485b838d72cc82b04f5b&number=20`);
  return result
}

export const RecipeCard = () => {
  const navigate = useNavigate();
  const recipe = useLoaderData();
  console.log(recipe);


  const goHome = () => {
    navigate("/recipe");
  };

  return (
    <div>
      <button onClick={goHome}>Go to home page</button>
    </div>
  )
}
