import "./HomeContentAdmin.css";
// ----------------------------------------------
import { Link } from "react-router-dom";

function HomeContentAdmin(): JSX.Element {
  return (
    <div className="HomeContentAdmin" id="homeContentLinkAdmin">
      <div>
        <div className="home-link-area-container parent">
          <Link to={"/api/admin/companies"}>Companies</Link>
        </div>
        <div className="home-link-area-container child">
          <Link to={"/api/admin/companies/add"}>Add Company</Link>
        </div>
      </div>
      <div>
        <div className="home-link-area-container parent">
          <Link to={"/api/admin/customers"}>Customers</Link>
        </div>
        <div className="home-link-area-container child">
          <Link to={"/api/admin/customers/add"}>Add Customer</Link>
        </div>
      </div>
    </div>
  );
}

export default HomeContentAdmin;
