import "./HomeContentDefault.css";
// ----------------------------------------------
import { Link } from "react-router-dom";

function HomeContentDefault(): JSX.Element {
  return (
    <div className="HomeContentDefault">
      <div className="home-link-area-container parent">
        <Link to={"/api/auth/login/admin"}>Administrator</Link>
      </div>
      <div className="home-link-area-container parent">
        <Link to={"/api/auth/login/company"}>Company</Link>
      </div>
      <div className="home-link-area-container parent">
        <Link to={"/api/auth/login/customer"}>Customer</Link>
      </div>
      <div className="home-link-area-container child">
        <Link to={"/about"}>🛈 About</Link>
      </div>
    </div>
  );
}

export default HomeContentDefault;
