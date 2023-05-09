import React, {useState} from 'react'
import { Recipe } from '../../types/recipeDataType'
import style from './recipe.module.scss'

type PropsData = {
  data: Recipe;
  isOpen: number;
  handleIsOpen: (id: number) => void;
}
export const RecipeCard = ({ data, isOpen, handleIsOpen }: PropsData) => {
    console.log(data.id);
  return (
    <div className={data.id === isOpen ? style.red : style.blue} onClick={() => handleIsOpen(data.id)}>RecipeCard</div>
  )
}
