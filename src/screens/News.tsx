import { FC } from 'react'
import { NewsType } from '../types/newsType';
import { apiLoader } from '../api/api';
import { defer, useLoaderData, Await } from "react-router-dom";

export const dataLoader = async () => {
  const request = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=782a7379df92415ebe4dc42d9983fc99'
  const data: NewsType = await apiLoader(request);
  return defer({ data });
};

export const News: FC = () => {
  const data = useLoaderData()
  // console.log(data.data.articles)
  return (
    <div>News</div>
  )
}