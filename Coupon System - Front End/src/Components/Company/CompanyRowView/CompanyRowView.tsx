import "./CompanyRowView.css";
// ----------------------------------------------
import { Link } from "react-router-dom";
// ----------------------------------------------
import { CompanyModel } from "../../../Models";
import { showCouponsCount } from "../../Utils/Utils";

interface CompanyRowProps {
  company: CompanyModel;
}

function CompanyRowView(props: CompanyRowProps): JSX.Element {
  return (
    <tr className="CompanyRowView row-view-container">
      <td>
        <Link to={`/api/admin/companies/${props.company.id}`}>🔍</Link>
        <Link to={`/api/admin/companies/update/${props.company.id}`}>🖊️</Link>
        <Link to={`/api/admin/companies/delete/${props.company.id}`}>🗑️</Link>
      </td>
      <td>{props.company.id}</td>
      <td>{props.company.name}</td>
      <td>{props.company.email}</td>
      <td>
        <Link
          className="number-link"
          to={`/api/admin/companies/${props.company.id}`}
        >
          {showCouponsCount(props.company.coupons.length)}
        </Link>
      </td>
    </tr>
  );
}

export default CompanyRowView;
