import "./MenuContentCustomer.css";
// ----------------------------------------------
import { Link } from "react-router-dom";

function MenuContentCustomer(): JSX.Element {
  return (
    <div className="MenuContentCustomer menu-container">
      <Link to={"/api/customer/home"}>🏠 Home</Link>
      <Link to={"/api/customer/details"}>📄 Account Details</Link>
      <Link to={"/api/customer/coupons"}>🏷️ My Coupons</Link>
      <Link to={"/api/customer/couponStore"}>🛒 Buy Coupon</Link>
    </div>
  );
}

export default MenuContentCustomer;
