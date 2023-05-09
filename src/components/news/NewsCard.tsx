import React from "react";
import { Article } from "../../types/newsType";
import style from "./newsCard.module.scss";
import * as dayjs from "dayjs";
dayjs().format();

type PropsData = {
  data: Article;
  isOpen: number;
  index: number;
  handleIsOpen: (id: number) => void;
};

export const NewsCard = ({ data, isOpen, index, handleIsOpen }: PropsData) => {
  console.log(data);
  const daysFormated = (i: Date) => {
    return dayjs(i).format("DD MMMM YYYY HH:MM");
  };

  return (
    <div className={style.newCardContainer}>
      <div
        className={
          isOpen === index ? style.openContainer : style.closeContainer
        }
        onClick={() => handleIsOpen(index)}
      >
        <section className={style.header}>
          <span className={style.headerTitle}>{data.title}</span>
          <p className={style.headerDescription}>{data.description}</p>
         
        </section>
        <section className={style.main}>
          <span className={style.mainDate}>
            {daysFormated(data.publishedAt)}
          </span>
          <p className={style.mainContent}>{data.content}</p>
          <img className={style.mainIMG} src={data.urlToImage} />
        </section>
      </div>
       <button onClick={() => handleIsOpen(-1)}>close</button>
    </div>
  );
};
// make default img if source in undefined
