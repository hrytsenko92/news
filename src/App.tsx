import "./App.scss";
import NavBar from "./components/navBar/NavBar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="appContainer">
      <nav className="navBar">
        <NavBar />
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
