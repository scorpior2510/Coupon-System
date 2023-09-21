import "./CustomerRowView.css";
// ----------------------------------------------
import { Link } from "react-router-dom";
// ----------------------------------------------
import { CustomerModel } from "../../../Models";
import { showCouponsCount } from "../../Utils/Utils";

interface CustomerRowViewProps {
  customer: CustomerModel;
}

function CustomerRowView(props: CustomerRowViewProps): JSX.Element {
  return (
    <tr className="CustomerRowView row-view-container">
      <td>
        <Link to={`/api/admin/customers/${props.customer.id}`}>🔍</Link>
        <Link to={`/api/admin/customers/update/${props.customer.id}`}>🖊️</Link>
        <Link to={`/api/admin/customers/delete/${props.customer.id}`}>🗑️</Link>
      </td>
      <td>{props.customer.id}</td>
      <td>{`${props.customer.firstName} ${props.customer.lastName}`}</td>
      <td>{props.customer.email}</td>
      <td>
        <Link
          to={`/api/admin/customers/${props.customer.id}`}
          className="number-link"
        >
          {showCouponsCount(props.customer.coupons.length)}
        </Link>
      </td>
    </tr>
  );
}

export default CustomerRowView;
