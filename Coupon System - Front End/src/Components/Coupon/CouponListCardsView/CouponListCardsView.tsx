import "./CouponListCardsView.css";
// ----------------------------------------------
import { CouponModel } from "../../../Models";
import { CouponCardView } from "..";
import { CouponScreenType, CouponCardsSize } from "../../Shared";

interface CouponListCardsViewProps {
  couponList: CouponModel[];
  screen: CouponScreenType;
  cardsSize: CouponCardsSize;
}

function CouponListCardsView(props: CouponListCardsViewProps): JSX.Element {
  return (
    <div className={`CouponListCardsView card-list-view-container ${props.cardsSize}`}>
      {props.couponList.map((coupon, idx) => (
        <CouponCardView
          key={`coupon-card-${idx}`}
          coupon={coupon}
          screen={props.screen}
        />
      ))}
    </div>
  );
}

export default CouponListCardsView;
