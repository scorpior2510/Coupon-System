import { useSelector } from "react-redux";
import "./HomeContentDefault.css";
// ----------------------------------------------
import { Link } from "react-router-dom";
import { selectIsDarkMode } from "../../../../Redux";

function HomeContentDefault(): JSX.Element {
  const isDarkMode = useSelector(selectIsDarkMode);

  let illustrationPathCustomer: string = isDarkMode
    ? "public/assets/images/logos/an-avatar-of-customer-type-user_dark.svg"
    : "public/assets/images/logos/an-avatar-of-customer-type-user_light.svg";
  let illustrationPathCompany: string = isDarkMode
    ? "public/assets/images/logos/an-avatar-of-company-type-user_dark.svg"
    : "public/assets/images/logos/an-avatar-of-company-type-user_light.svg";
  let illustrationPathAdmin: string = isDarkMode
    ? "public/assets/images/logos/an-avatar-of-administrator-type-user_dark.svg"
    : "public/assets/images/logos/an-avatar-of-administrator-type-user_light.svg";

  return (
    <div className="HomeContentDefault">
      <div className="home-link-area-container">
        <img src={illustrationPathAdmin} alt="admin avatar" />
        <Link to={"/api/auth/login/admin"}>Administrator</Link>
      </div>
      <div className="home-link-area-container">
        <img src={illustrationPathCompany} alt="company avatar" />
        <Link to={"/api/auth/login/company"}>Company</Link>
      </div>
      <div className="home-link-area-container">
        <img src={illustrationPathCustomer} alt="customer avatar" />
        <Link to={"/api/auth/login/customer"}>Customer</Link>
      </div>
    </div>
  );
}

export default HomeContentDefault;
