import "./CompanyFocusedViewCo.css";
// ----------------------------------------------
import { Link } from "react-router-dom";
// ----------------------------------------------
import { CompanyModel } from "../../../Models";
import { showCouponsCount } from "../../Utils/Utils";

interface CompanyFocusedViewCoProps {
  company: CompanyModel;
}

function CompanyFocusedViewCo(props: CompanyFocusedViewCoProps): JSX.Element {
  return (
    <div className="CompanyFocusedViewCo">
      <h2>{props.company.name}</h2>
      <p>{`Email: ${props.company.email}`}</p>
      <p>
        <span>Coupons: </span>
        <Link to={`/api/company/coupons`} className="number-link">{showCouponsCount(props.company.coupons.length)}</Link>
      </p>
    </div>
  );
}

export default CompanyFocusedViewCo;
