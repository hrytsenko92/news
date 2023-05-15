import { Link } from 'react-router-dom'
import style from "./recipeList.module.scss";
import { Result } from "../../../types/recipeList";

type PropsData = {
  data: Result;
};
export const RecipeList = ({ data }: PropsData) => {
  console.log(data);
  return (
    <section className={style.container}>
      {data.id}
      <div className={style.recipeIMG}>
        <img src={data.image} alt="" />
      </div>
      <span>{data.title}</span>
      <Link to={`${data.id}`}>
        go
      </Link>

    </section>
  );
};
