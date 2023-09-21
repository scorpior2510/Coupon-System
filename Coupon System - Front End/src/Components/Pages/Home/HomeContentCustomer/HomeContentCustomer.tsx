import "./HomeContentCustomer.css";
// ----------------------------------------------
import { Link } from "react-router-dom";

function HomeContentCustomer(): JSX.Element {
  return (
    <div className="HomeContentCustomer">
      <div className="home-link-area-container parent">
        <Link to={"/api/customer/details"}>Account Details</Link>
      </div>
      <div className="home-link-area-container parent">
        <Link to={"/api/customer/coupons"}>My Coupons</Link>
      </div>
      <div className="home-link-area-container parent">
        <Link to={"/api/customer/couponStore"}>Buy Coupon</Link>
      </div>
    </div>
  );
}

export default HomeContentCustomer;
