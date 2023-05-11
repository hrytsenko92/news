import { Outlet, Link } from "react-router-dom";
import style from "./app.module.scss";
import { useState } from "react";
import closeSVG from "./assets/close.svg";
import burgerSVG from "./assets/burger.svg";

export const App = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div
      className={isOpen ? style.appContainerIsOpen : style.appContainerIsClosed}
    >
      <button className={style.isOpen} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <img className={style.closeSVG} src={closeSVG} />
        ) : (
          <img className={style.burgerSVG} src={burgerSVG} />
        )}
      </button>
      <nav className={style.navigation}>
        <Link onClick={() => setIsOpen(false)} to={"/news"}>
          News
        </Link>
        <Link onClick={() => setIsOpen(false)} to={"/weather"}>
          Weather
        </Link>
        <Link onClick={() => setIsOpen(false)} to={"/exchange"}>
          Exchange
        </Link>
        <Link onClick={() => setIsOpen(false)} to={"/recipe"}>
          Recipe
        </Link>
      </nav>
      <main className={style.outlet}>
        <Outlet />
      </main>
    </div>
  );
};
