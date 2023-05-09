import NavBar from "./components/navBar/NavBar";
import { Outlet} from "react-router-dom";
import style from "./app.module.scss";

export const App = () => {
  return (
    <div className={style.appContainer}>
      <nav className={style.navigation}>
        <NavBar />
      </nav>
      <main className={style.outlet}>
        <Outlet />
      </main>
    </div>
  );
}
