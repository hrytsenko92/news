import style from "./recipeCard.module.scss";
import { apiLoader } from "../../../loaders/apiLoader";
import { defer, useLoaderData } from "react-router-dom";
import { Recipe } from "../../../types/recipeDataType";

export const singleRecipeLoader = async ({ params }) => {
  const data: Recipe = await apiLoader(
    `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=1e23ac7b985f4eef8bddaa18559163d9&number=20`
  );
  return defer({ data });
};

export const RecipeCard = () => {
  const { data }: { data: Recipe } = useLoaderData();

  return (
    <section className={style.container}>
      <div className={style.imgWrapper}>
        <img className={style.img} src={data.image} alt={data.title} />
      </div>
      <div className={style.infoWrapper}>
        <span className={style.title}>{data.title}</span>
        <div className={style.dishTypesWrapper}>
          {data.dishTypes.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
        <div className={style.timeType}>
          <span
            className={style.time}
          >{`Ready in ${data.readyInMinutes} minutes`}</span>
          <span className={style.gluten}>
            {data.glutenFree ? (
              <span>Gluten free : YES</span>
            ) : (
              <span>Gluten free: NO</span>
            )}
          </span>
          <span className={style.vegetarian}>
            {data.vegetarian ? (
              <span>Vegetarian: YES</span>
            ) : (
              <span>Vegetarian: NO</span>
            )}
          </span>
        </div>
        <div className={style.summary}>
          {data.summary.replace(/<[^>]+>/g, "")}
        </div>
      </div>
      <div className={style.stepsWrapper}>
        {data.analyzedInstructions[0].steps.map((item, index) => (
          <p className={style.stepItem} key={index}>
            {item.step}
          </p>
        ))}
      </div>
    </section>
  );
};
