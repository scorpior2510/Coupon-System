import "./HomeContentCustomer.css";
// ----------------------------------------------
import { Link } from "react-router-dom";

function HomeContentCustomer(): JSX.Element {
  return (
    <div className="HomeContentCustomer">
      <div className="home-link-area-container dashboard-stat-container">
        <span>Coupons Owned</span>
        <Link to={"/api/customer/coupons"}>5</Link>
      </div>
      <div className="home-link-area-container dashboard-stat-container">
        <span>Coupons In Store</span>
        <Link to={"/api/customer/couponStore"}>200</Link>
      </div>
    </div>
  );
}

export default HomeContentCustomer;
