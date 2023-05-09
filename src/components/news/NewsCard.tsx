import React from "react";
import { Article } from "../../types/newsType";
import style from "./newsCard.module.scss";
import * as dayjs from 'dayjs'
dayjs().format()

type PropsData = {
  data: Article;
  isOpen: number;
  index: number;
  handleIsOpen: (id: number) => void;
};

export const NewsCard = ({ data, isOpen, index, handleIsOpen }: PropsData) => {
  console.log(data)
   const daysFormated = (i: Date) => {
        return dayjs(i).format('DD MMMM YYYY HH:MM')
    };

  return (
    <div
      className={isOpen === index ? style.red : style.blue}
      onClick={() => handleIsOpen(index)}
    >
      <section className="titleWrapper">
        <h4>{data.title}</h4>
        <p>{data.description}</p>
      </section>
      <section>
        <span>{daysFormated(data.publishedAt)}</span>
         <p>{data.content}</p>
      </section>
    </div>
  );
};
