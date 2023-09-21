import "./CouponPurchaseSuccessPrompt.css";
// ----------------------------------------------
import { Link } from "react-router-dom";
// ----------------------------------------------
import { TitleWithLogo } from "../../UI";

function CouponPurchaseSuccessPrompt(): JSX.Element {
  return (
    <div className="CouponPurchaseSuccessPrompt">
      <TitleWithLogo
        screen={"SuccessPrompt"}
        text={"Coupon Bought Successfully"}
      />
      <p>Do you want to buy another coupon?</p>
      <Link to={"/api/customer/couponStore"}>
        <button>Buy Another Coupon</button>
      </Link>
      <Link to={"/api/customer/home"}>
        <button>Done</button>
      </Link>
    </div>
  );
}

export default CouponPurchaseSuccessPrompt;
