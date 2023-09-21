import "./CustomerFocusedViewCu.css";
// ----------------------------------------------
import { CustomerModel } from "../../../Models";
import { Link } from "react-router-dom";
import { showCouponsCount } from "../../Utils/Utils";

interface CustomerFocusedViewCuProps {
  customer: CustomerModel;
}

function CustomerFocusedViewCu(props: CustomerFocusedViewCuProps): JSX.Element {
  return (
    <div className="CustomerFocusedViewCu">
      <h2>{`${props.customer.firstName} ${props.customer.lastName}`}</h2>
      <p>{`Email: ${props.customer.email}`}</p>
      <p>
        <span>Coupons: </span>
        <Link to={`/api/customer/coupons`} className="number-link">
          {showCouponsCount(props.customer.coupons.length)}
        </Link>
      </p>
    </div>
  );
}

export default CustomerFocusedViewCu;
