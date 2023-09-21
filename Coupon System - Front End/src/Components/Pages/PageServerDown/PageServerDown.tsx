import "./PageServerDown.css";
// ----------------------------------------------
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// ----------------------------------------------
import { selectIsDarkMode } from "../../../Redux";

function PageServerDown(): JSX.Element {
    const theme = useSelector(selectIsDarkMode) ? "dark-mode" : "light-mode";
    const illustrationPath: string =
      theme === "light-mode"
        ? "/assets/images/empty_views/undraw_server_down_s-4-lk_light.svg"
        : "/assets/images/empty_views/undraw_server_down_s-4-lk_dark.svg";
    return (
        <div className="PageServerDown">
      <img src={illustrationPath}></img>
      <p>Server is Down</p>
      <Link className="button-like-link" to={"/home"}>
        Go Back To Home Page
      </Link>
			
        </div>
    );
}

export default PageServerDown;