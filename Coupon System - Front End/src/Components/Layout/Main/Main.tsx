import "./Main.css";
// ----------------------------------------------
import { Outlet } from "react-router-dom";
// ----------------------------------------------
import { Routing } from "..";

function Main(): JSX.Element {
  return (
    <div className="Main">
      <Routing />
      <Outlet />
    </div>
  );
}

export default Main;
