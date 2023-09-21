import "./MenuContentCompany.css";
// ----------------------------------------------
import { Link } from "react-router-dom";

function MenuContentCompany(): JSX.Element {
  return (
    <div className="MenuContentCompany menu-container">
      <Link to={"/api/company/home"}>🏠 Home</Link>
      <Link to={"/api/company/details"}>📄 Account Details</Link>
      <Link to={"/api/company/coupons"}>📄 Coupons</Link>
      <Link to={"/api/company/coupons/add"}>➕ Add Coupon</Link>
    </div>
  );
}

export default MenuContentCompany;
