import React, { ChangeEvent } from "react";
import closeSVG from "../../../assets/closeRed.svg";
import style from "./recipeForm.module.scss";

type FormProps = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  recipeTitle: string;
  clearInput: () => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const RecipeForm = ({
  handleSubmit,
  recipeTitle,
  clearInput,
  handleChange,
}: FormProps) => {
  return (
      <form className={style.formWrapper} onSubmit={handleSubmit}>
          {recipeTitle.length > 0 ? <button className={style.clearInput} onClick={clearInput}>
            <img className={style.closeSVG} src={closeSVG} />
          </button> : null}
          <input
           className={style.formInput}
          required
          type="text"
          placeholder="Enter recipe name"
          value={recipeTitle}
          onChange={handleChange}
          />
        <input className={style.formSubmit} value='Search...' type="submit" />
      </form>
  );
};
