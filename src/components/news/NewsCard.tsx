import React from "react";
import { Article } from "../../types/newsType";
import style from "./newsCard.module.scss";
import * as dayjs from "dayjs";
import notFound from '../../assets/not404.jpg'
import closeSVG from '../../assets/close.svg'
import rightSVG from '../../assets/right.svg'
dayjs().format();

type PropsData = {
  data: Article;
  isOpen: number;
  index: number;
  handleIsOpen: (id: number) => void;
};

export const NewsCard = ({ data, isOpen, index, handleIsOpen }: PropsData) => {
  const daysFormated = (i: Date) => {
    return dayjs(i).format("DD MMMM HH:MM");
  };

  return (
    <div className={style.newCardContainer}>
      {isOpen === index ? (
        <button className={style.closeBTN} onClick={() => handleIsOpen(-1)}>
          <img className={style.closeSVG} src={closeSVG}/>
        </button>
      ) : null}
      <div
        className={
          isOpen === index ? style.openContainer : style.closeContainer
        }
        onClick={() => handleIsOpen(index)}
      >
        <span className={style.title}>{data.title}</span>
        {data.content !== null ? <p className={style.description}>{data.content.replace(/\[\+\d+ chars\]/g, '')}</p> : null } 
        {data.author ? <span className={style.author}>{data.author}</span>: null}
        <span className={style.infoWrapper}>
          <span className={style.date}>{daysFormated(data.publishedAt)}</span>
          <a className={style.readMore} href={data.url} target="_blank">Read more<img className={style.rightSVG} src={rightSVG} /></a>
        </span>
        {data.urlToImage ?  <img className={style.img} src={data.urlToImage} /> :  <img className={style.img} src={notFound} /> }
      </div>
    </div>
  );
};
// make default img if source in undefined


