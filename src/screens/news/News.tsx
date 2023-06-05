import { FC, Suspense } from "react";
import { NewsType, Article } from "../../types/newsType";
import { apiLoader } from "../../loaders/apiLoader";
import { defer, useLoaderData, Await } from "react-router-dom";
import { ItemCard } from "../../components/news/ItemCard";
import style from "./news.module.scss";

export const newsDataLoader = async () => {
  const req = `https://newsapi.org/v2/top-headlines?country=us&page=1&apiKey=${
    import.meta.env.VITE_NEWS_API_KEY
  }`;
  const data: NewsType = await apiLoader(req);
  return defer({ data });
};

export const News: FC = () => {
  const { data } = useLoaderData();
  return (
    <div className={style.newsContainer}>
      <div className={style.titleWrapper}>
        <h2 className={style.title}>Latest Updates</h2>
      </div>
      <div className={style.listWrapper}>
        <Suspense fallback={<p>suspense loading...</p>}>
          <Await
            resolve={data}
            errorElement={<p>error...</p>}
            children={(data) =>
              data.articles.map((item: Article, index: number) => (
                <ItemCard data={item} key={index} />
              ))
            }
          />
        </Suspense>
      </div>
    </div>
  );
};
