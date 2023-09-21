import "./Page404.css";
// ----------------------------------------------
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// ----------------------------------------------
import { selectIsDarkMode } from "../../../Redux";

function Page404(): JSX.Element {
  const theme = useSelector(selectIsDarkMode) ? "dark-mode" : "light-mode";

  const illustrationPath: string =
    theme === "light-mode"
      ? "/assets/images/empty_views/undraw_page_not_found_re_e9o6 _page404_light.svg"
      : "/assets/images/empty_views/undraw_page_not_found_re_e9o6 _page404_dark.svg";

  return (
    <div className="Page404">
      <img src={illustrationPath}></img>
      <p>We couldn't find this page</p>
      <Link className="button-like-link" to={"/home"}>
        Go Back To Home Page
      </Link>
    </div>
  );
}

export default Page404;
