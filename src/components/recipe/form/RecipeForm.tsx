import React, { ChangeEvent } from "react";
import closeSVG from "../../../assets/closeRed.svg";
import style from "./recipeForm.module.scss";
import random from '../../../assets/random.svg';

type FormProps = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  recipeTitle: string;
  clearInput: () => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  randomLoader: () => void;
};

export const RecipeForm = ({
  handleSubmit,
  recipeTitle,
  clearInput,
  handleChange,
  randomLoader,
}: FormProps) => {
  return (
    <section className={style.formSection}>
      <form className={style.formWrapper} onSubmit={handleSubmit}>
          {recipeTitle.length > 0 ? <button className={style.clearInput} onClick={clearInput}>
            <img className={style.closeSVG} src={closeSVG} />
          </button> : null}
          <input
           className={style.formInput}
          required
          type="text"
          placeholder="Enter recipe name..."
          value={recipeTitle}
          onChange={handleChange}
          />
        <input className={style.formSubmit} value='Search...' type="submit" />
        <button className={style.formRandomBtn} onClick={randomLoader}>
          <img className={style.randomSVG} src={random} />
        </button>
      </form>
    </section>
  );
};

// type FormProps = {
//   handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
//   recipeTitle: string;
//   clearInput: () => void;
//   handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
// };

// export const RecipeForm = ({
//   handleSubmit,
//   recipeTitle,
//   clearInput,
//   handleChange,
// }: FormProps) => {
//   return (
//     <section className={style.formSection}>
//       <form className={style.formWrapper} onSubmit={handleSubmit}>
//         {recipeTitle.length > 0 ? (
//           <button className={style.clearInput} onClick={clearInput}>
//             <img className={style.closeSVG} src={closeSVG} />
//           </button>
//         ) : null}
//         <input
//           className={style.formInput}
//           required
//           type="text"
//           placeholder="Enter recipe name..."
//           value={recipeTitle}
//           onChange={handleChange}
//         />
//         <input className={style.formSubmit} value="Search..." type="submit" />
//       </form>
//     </section>
//   );
// };