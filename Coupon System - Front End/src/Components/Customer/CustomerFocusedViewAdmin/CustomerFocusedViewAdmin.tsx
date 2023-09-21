import "./CustomerFocusedViewAdmin.css";
// ----------------------------------------------
import { useParams, Link } from "react-router-dom";
// ----------------------------------------------
import { selectCustomerList } from "../../../Redux";
import { CouponListTableView } from "../../Coupon";
import { useSelector } from "react-redux";

function CustomerFocusedViewAdmin(): JSX.Element {
  const params = useParams();
  const id = +(params.id || 0);

  const customer = useSelector(selectCustomerList).find((c) => c.id === id)!;

  return (
    <div className="CustomerFocusedViewAdmin">
      <h2>{`${customer.firstName} ${customer.lastName} (#${customer.id})`}</h2>
      <p>{`Email: ${customer.email}`}</p>
      {customer.coupons.length === 0 ? (
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
            couponList={customer.coupons}
            screen="AdminCustomerCouponList"
          />
        </>
      )}
      <Link to={`/api/admin/customers`} className="button-like-link">Back To List</Link>
      <Link to={`/api/admin/customers/update/${customer.id}`} className="button-like-link">🖊️ Update</Link>
      <Link to={`/api/admin/customers/delete/${customer.id}`} className="button-like-link">🗑️ Delete</Link>
    </div>
  );
}

export default CustomerFocusedViewAdmin;
