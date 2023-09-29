import "./HomeContentAdmin.css";
// ----------------------------------------------
import { Link } from "react-router-dom";

function HomeContentAdmin(): JSX.Element {
  return (
    <div className="HomeContentAdmin" id="homeContentLinkAdmin">
      <div className="home-link-area-container dashboard-stat-container">
        <span>Companies</span>
        <Link to={"/api/admin/companies"}>55</Link>
      </div>
      <div className="home-link-area-container dashboard-stat-container">
        <span>Customers</span>
        <Link to={"/api/admin/customers"}>55</Link>
      </div>
    </div>
  );
}

export default HomeContentAdmin;
