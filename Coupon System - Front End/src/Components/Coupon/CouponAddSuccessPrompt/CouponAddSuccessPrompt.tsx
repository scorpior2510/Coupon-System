import "./CouponAddSuccessPrompt.css";
// ----------------------------------------------
import { Link } from "react-router-dom";
// ----------------------------------------------
import { TitleWithLogo } from "../../UI";

interface CouponAddSuccessPromptProps {
  hideCouponSuccessPrompt: () => void;
}

function CouponAddSuccessPrompt(
  props: CouponAddSuccessPromptProps
): JSX.Element {
  return (
    <div className="CouponAddSuccessPrompt success-prompt-container">
      <TitleWithLogo
        screen={"SuccessPrompt"}
        text={"Coupon Added Successfully"}
      />
      <p>Do you want to create another coupon?</p>
      <button onClick={props.hideCouponSuccessPrompt}>
        Create Another Coupon
      </button>
      <Link to={"/api/company/home"}>
        <button>Done</button>
      </Link>
    </div>
  );
}

export default CouponAddSuccessPrompt;
