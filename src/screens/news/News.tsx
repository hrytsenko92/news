import { FC, Suspense, useState } from "react";
import { NewsType, Article } from "../../types/newsType";
import { apiLoader } from "../../loaders/apiLoader";
import { defer, useLoaderData, Await } from "react-router-dom";
import { NewsCard } from "../../components/news/NewsCard";
import style from "./news.module.scss";

export const newsDataLoader = async () => {
  const request =
    "https://newsapi.org/v2/top-headlines?country=us&apiKey=782a7379df92415ebe4dc42d9983fc99";
  const data: NewsType = await apiLoader(request);
  return defer({ data });
};

export const News: FC = () => {
  const { data } = useLoaderData();
  const [isOpen, setIsOpen] = useState<number>(-1);
  const handleIsOpen = (id: number) => {
    setIsOpen(id);
  };
  return (
    <div className={style.newsContainer}>
      <Suspense fallback={<p>suspense loading...</p>}>
        <Await
          resolve={data}
          errorElement={<p>error...</p>}
          children={(data) =>
            data.articles.map((item: Article, index: number) => (
              <NewsCard
                data={item}
                isOpen={isOpen}
                handleIsOpen={handleIsOpen}
                index={index}
                key={index}
              />
            ))
          }
        />
      </Suspense>
    </div>
  );
};
