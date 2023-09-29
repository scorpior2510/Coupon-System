import "./HomeContentCompany.css";
// ----------------------------------------------
import { Link } from "react-router-dom";

function HomeContentCompany(): JSX.Element {
  return (
    <div className="HomeContentCompany">
      <div className="home-link-area-container dashboard-stat-container">
        <span>Coupons</span>
        <Link to={"/api/company/coupons"}>10</Link>
      </div>
      <div className="home-link-area-container dashboard-stat-container">
        <span>Purchases</span>
        <Link to={"/api/company/coupons"}>250</Link>
      </div>
    </div>
  );
}

export default HomeContentCompany;
