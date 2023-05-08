import React, {useState} from 'react'
import { Recipe } from '../../types/recipeDataType'

type PropsData = {
  data: Recipe;
}
export const RecipeCard = ({ data }: PropsData) => {
    console.log(data.id);
  return (
    <div>RecipeCard</div>
  )
}
