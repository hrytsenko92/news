import NavBar from "./components/navBar/NavBar";
import { Outlet} from "react-router-dom";
import style from "./app.module.scss";
import { FC } from "react";

export const App: FC = () => {
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

// export const App: FC = () => {
//   const locationData = useLoaderData();
//   return (
//     <div className={style.appContainer}>
//       <nav className={style.navigation}>
//         <NavBar />
//       </nav>
//       <main className={style.outlet}>
//         <Suspense
//           fallback={
//             <Outlet context={{ latitude: 50.4345901, longitude: 30.4832584 }} />
//           }
//         >
//           <Await resolve={locationData} errorElement={<p>Error...</p>}>
//             {(locationData) => <Outlet context={{ locationData }} />}
//           </Await>
//         </Suspense>
//       </main>
//     </div>
//   );
// };
