import "./Header.css";
// ----------------------------------------------
import { RiCoupon4Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// ----------------------------------------------
import { AuthMenu } from "../../Auth";
import { LightingModeButton } from "../../UI";
import { selectIsDarkMode } from "../../../Redux";

function Header(): JSX.Element {
  const isDarkMode: boolean = useSelector(selectIsDarkMode);
  const illustrationPath: string = isDarkMode
    ? "/assets/images/logos/undraw_react_re_g3ui_dark.svg"
    : "/assets/images/logos/undraw_react_re_g3ui_light.svg";

  return (
    <div className="Header">
      <div className="logo-container">
        <Link to={"/home"}>
          <img src={illustrationPath}></img>
        </Link>
      </div>
      <div className="title-container">
        <RiCoupon4Line className="title-icon" />
        <h1>Coupon System</h1>
        <RiCoupon4Line className="title-icon" />
      </div>
      <div className="header-menu-container">
        <AuthMenu />
        <LightingModeButton />
      </div>
    </div>
  );
}

export default Header;
