import { Article } from "../../types/newsType";
import style from "./itemCard.module.scss";
import notFound from "../../assets/not404.jpg";
import rightSVG from "../../assets/right.svg";
import { format } from 'date-fns'

type PropsData = {
  data: Article;
};

export const ItemCard = ({ data }: PropsData) => {
  const daysFormated = (i: Date) => {
    return format(new Date(i), 'dd LLL HH:mm')
  };
  return (
    <div className={style.itemCardContainer}>
      <div className={style.contentWrapper}>
        {data.urlToImage ? (
          <img className={style.img} src={data.urlToImage} />
        ) : (
          <img className={style.img} src={notFound} />
        )}
        <span className={style.title}>{data.title}</span>
        {data.content !== null ? (
          <p className={style.description}>
            {data.content.replace(/\[\+\d+ chars\]/g, "")}
          </p>
        ) : null}
      </div>
      <div className={style.infoWrapper}>
        <div className={style.authorDate}>
          {data.author && data.author.length < 15 ? (
            <span className={style.author}>{data.author}</span>
          ) : null}
          <span className={style.date}>{daysFormated(data.publishedAt)}</span>
        </div>
        <a className={style.readMore} href={data.url} target="_blank">
          Read more
          <img className={style.rightSVG} src={rightSVG} />
        </a>
      </div>
    </div>
  );
};
