import { ChangeEvent, FC, Suspense, useState } from "react";
import { apiLoader } from "../../loaders/apiLoader";
import { RecipeListItem } from "../../components/recipe/recipeList/RecipeListItem";
import { RecipeForm } from "../../components/recipe/form/RecipeForm";
// import { RecipeDataType } from '../../types/recipeDataType';
import { RecipeListType, Result } from "../../types/recipeList";
import style from "./recipe.module.scss";
import { Await, defer, useLoaderData } from "react-router-dom";

// export const randomRecipeLoader = async () => {
//   const request = `https://api.spoonacular.com/recipes/random?apiKey=0afa93738442485b838d72cc82b04f5b&number=20`;
//   const randomRecipeData: RecipeListType = await apiLoader(request);
//   return defer({ randomRecipeData });
// };

export const Recipe: FC = () => {
  // const { randomRecipeData } = useLoaderData();
  const [recipeTitle, setRecipeTitle] = useState<string>("");
  const [recipeData, setRecipeData] = useState<RecipeListType>();

  const randomLoader = async () => {
    const result: RecipeListType = await apiLoader(`https://api.spoonacular.com/recipes/random?apiKey=0afa93738442485b838d72cc82b04f5b&number=20`);
    // console.log(result)
    setRecipeData(result);
  }

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
console.log(recipeData)
// console.log(randomRecipeData)
  return (
    <div className={style.container}>
      <div className={style.formWrapper}>
        <p className={style.title}>Find your favorite recipe...</p>
        <RecipeForm
        handleSubmit={handleSubmit}
        recipeTitle={recipeTitle}
        clearInput={clearInput}
        handleChange={handleChange}
        randomLoader={randomLoader}
      />
      </div>
      <div className={style.list}>
        {recipeData !== undefined && Object.hasOwn(recipeData, 'results') ? (
          recipeData.results.map((item: Result) => (
            <RecipeListItem data={item} key={item.id} />
          ))
        )  : <span>Loading</span>}
      </div>
    </div>
  );
};

// : recipeData !== undefined && Object.hasOwn(recipeData, 'results') ? recipeData.results.map((item: Result) => (
//             <RecipeListItem data={item} key={item.id} />
//           ))

//  return (
//     <div className={style.container}>
//       <div className={style.formWrapper}>
//         <p className={style.title}>Find your favorite recipe...</p>
//         <RecipeForm
//         handleSubmit={handleSubmit}
//         recipeTitle={recipeTitle}
//         clearInput={clearInput}
//         handleChange={handleChange}
//         randomLoader={randomLoader}
//       />
//       </div>
//       <div className={style.list}>
//         {recipeData !== undefined && Object.hasOwn(recipeData, 'results') ? (
//           recipeData.results.map((item: Result) => (
//             <RecipeListItem data={item} key={item.id} />
//           ))
//         )  : (
//           <Suspense fallback={<p>suspense loading...</p>}>
//             <Await
//               resolve={randomRecipeData}
//               errorElement={<p>error...</p>}
//               children={(data) =>
//                 data.recipes.map((item: Result) => (
//                   <RecipeListItem data={item} key={item.id} />
//                 ))
//               }
//             />
//           </Suspense>
//         )}
//       </div>
//     </div>
//   );