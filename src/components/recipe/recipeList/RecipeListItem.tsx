import { Link } from 'react-router-dom'
import style from "./recipeListItem.module.scss";
import { Result } from "../../../types/recipeList";

type PropsData = {
  data: Result;
};
export const RecipeListItem = ({ data }: PropsData) => {
  return (
    <section className={style.container}>
      <div className={style.imgWrapper}>
        <img className={style.img} src={data.image} alt="" />
      </div>
      <span className={style.recipeTitle}>{data.title}</span>
      <Link className={style.link} to={`${data.id}`}>
        go
      </Link>

    </section>
  );
};
