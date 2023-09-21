import "./HomeContentCompany.css";
// ----------------------------------------------
import { Link } from "react-router-dom";

function HomeContentCompany(): JSX.Element {
  return (
    <div className="HomeContentCompany">
      <div className="home-link-area-container parent">
        <Link to={"/api/company/details"}>Account Details</Link>
      </div>
      <div className="home-link-area-container parent">
        <Link to={"/api/company/coupons"}>Coupons</Link>
      </div>
      <div className="home-link-area-container child">
        <Link to={"/api/company/coupons/add"}>Add Coupon</Link>
      </div>
    </div>
  );
}

export default HomeContentCompany;
