import "./CouponDeleteConfirmation.css";
// ----------------------------------------------
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// ----------------------------------------------
import { CouponModel } from "../../../Models";
import {
  deleteCouponAction,
  selectCompany,
} from "../../../Redux";
import { webApiService, notifyService } from "../../../Services";
import { TitleWithLogo } from "../../UI";

function CouponDeleteConfirmation(): JSX.Element {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const id = +(params.id || 0);

  const [coupon] = useState<CouponModel>(
    useSelector(selectCompany).coupons.find((c) => c.id === id)!
  );

  const handleDelete = () => {
    webApiService
      .deleteCoupon(id)
      .then(() => {
        dispatch(deleteCouponAction(id));
        navigate("/api/company/coupons");
        notifyService.successPlainText("coupon deleted successfully");
      })
      .catch((error) => {
        if (error?.code === "ERR_NETWORK") {
          navigate("/server/down");
        }
        notifyService.errorAxiosApiCall(error);
      });
  };

  const handleCancel = () => {
    navigate("/api/company/coupons");
  };

  return (
    <div className="CouponDeleteConfirmation delete-confirmation-container">
      <TitleWithLogo screen={"DeleteConfirmation"} text={"Delete Coupon"} />
      <p>Are you sure you want to delete the following coupon?</p>
      <div>
        <p>{`${coupon.title} (#${coupon.id})`}</p>
        <p>{coupon.description}</p>
        <p>{`Category: ${coupon.category}`}</p>
      </div>
      <p>
        <span className="warning-message">Warning:</span> Deleting a coupon also
        deletes it's made purchases
      </p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
}

export default CouponDeleteConfirmation;
