import "./MenuContentAdmin.css";
// ----------------------------------------------
import { Link } from "react-router-dom";

function MenuContentAdmin(): JSX.Element {
  return (
    <div className="MenuContentAdmin menu-container">
      <Link to={"/api/admin/home"}>🏠 Home</Link>
      <Link to={"/api/admin/companies"}>📄 Companies</Link>
      <Link to={"/api/admin/companies/add"}>➕ Add Company</Link>
      <Link to={"/api/admin/customers"}>📄 Customers</Link>
      <Link to={"/api/admin/customers/add"}>➕ Add Customer</Link>
    </div>
  );
}

export default MenuContentAdmin;
