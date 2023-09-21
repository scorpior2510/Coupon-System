import "./CompanyFocusedViewAdmin.css";
// ----------------------------------------------
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
// ----------------------------------------------
import { CompanyModel } from "../../../Models";
import { selectCompanyList } from "../../../Redux";
import { CouponListTableView } from "../../Coupon";
import { useSelector } from "react-redux";

function CompanyFocusedViewAdmin(): JSX.Element {

  const params = useParams();
  const id = +(params.id || 0);
  const [company] = useState<CompanyModel>(
    useSelector(selectCompanyList).find((c) => c.id === id)!
  );

  return (
    <div className="CompanyFocusedViewAdmin">
      <h2>{`${company.name} (#${company.id})`}</h2>
      <p>{`Email: ${company.email}`}</p>
      {company.coupons.length === 0 ? (
        <p>
          <u>Coupon List:</u>
          <span> No Coupons</span>
        </p>
      ) : (
        <>
          <p>
            <u>Coupon List:</u>
          </p>
          <CouponListTableView
            couponList={company.coupons}
            screen="AdminCompanyCouponList"
          />
        </>
      )}
      <div>
        <Link to={`/api/admin/companies`} className="button-like-link">Back To List</Link>
        <Link to={`/api/admin/companies/update/${company.id}`} className="button-like-link">🖊️ Update</Link>
        <Link to={`/api/admin/companies/delete/${company.id}`} className="button-like-link">🗑️ Delete</Link>
      </div>
    </div>
  );
}

export default CompanyFocusedViewAdmin;
