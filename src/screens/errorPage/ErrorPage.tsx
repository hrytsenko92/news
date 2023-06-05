import { FC } from "react";
import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import style from "./errorPage.module.scss";
export const ErrorPage: FC = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    console.log(error.status);
    return (
      <div className={style.container}>
        <h1 className={style.title}>Oops! {error.status}</h1>
        {error.data?.message && (
          <p className={style.discription}>
            <i>{error.data.message}</i>
          </p>
        )}
        <Link className={style.link} to={"/"}>
          Home page
        </Link>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className={style.container}>
        <h1 className={style.title}>Oops! Unexpected Error</h1>
        <p className={style.discription}>
          <i>{error.message}</i>
        </p>
        <Link className={style.link} to={"/"}>
          Home page
        </Link>
      </div>
    );
  } else {
    return <></>;
  }
};
