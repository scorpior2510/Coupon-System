import "./CouponPurchaseConfirmation.css";
// ----------------------------------------------
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// ----------------------------------------------
import { CouponCardView, CouponPurchaseSuccessPrompt } from "..";
import { CouponModel } from "../../../Models";
import {
  purchaseCouponAction,
  decreaseCouponAmountByOneAction,
  selectCouponList,
} from "../../../Redux";
import { webApiService, notifyService } from "../../../Services";

function CouponPurchaseConfirmation(): JSX.Element {
    
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const id = +(params.id || 0);

  const [coupon] = useState<CouponModel>(
    useSelector(selectCouponList).find((c) => c.id === id)!
  );

  const [showPurchaseSuccessPrompt, setShowPurchaseSuccessPrompt] =
    useState<boolean>(false);

  const handlePurchase = () => {
    webApiService
      .purchaseCoupon(coupon)
      .then(() => {
        dispatch(purchaseCouponAction(coupon));
        dispatch(decreaseCouponAmountByOneAction(coupon));
        setShowPurchaseSuccessPrompt(true);
        notifyService.successPlainText("coupon bought successfully");
      })
      .catch((error) => {
        if (error?.code === "ERR_NETWORK") {
          navigate("/server/down");
        }
        notifyService.errorAxiosApiCall(error);
      });
  };

  const handleCancel = () => {
    navigate("/api/customer/couponStore");
  };

  return (
    <div className="CouponPurchaseConfirmation purchase-confirmation-container">
      {showPurchaseSuccessPrompt ? (
        <CouponPurchaseSuccessPrompt />
      ) : (
        <>
          <h2>Buy Coupon</h2>
          <p>Do you want to continue and buy the coupon?</p>
          <CouponCardView coupon={coupon} screen={"CustomerCouponPurchaseConfirmation"} />
          <button onClick={handlePurchase}>Buy</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      )}
    </div>
  );
}

export default CouponPurchaseConfirmation;
