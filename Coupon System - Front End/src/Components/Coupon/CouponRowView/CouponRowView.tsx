import "./CouponRowView.css";
// ----------------------------------------------
import moment from "moment";
// ----------------------------------------------
import { CouponModel } from "../../../Models";
import { CouponScreenType } from "../../Shared";

interface CouponRowProps {
  coupon: CouponModel;
  screen: CouponScreenType;
}

function CouponRowView(props: CouponRowProps): JSX.Element {

  return (
    <>
      {props.screen === "AdminCompanyCouponList" &&
      <tr className="CouponRowView row-view-container">
        <td>{props.coupon.id}</td>
        <td>{props.coupon.category}</td>
        <td>{props.coupon.title}</td>
        <td>{moment(props.coupon.startDate).format("DD/MM/YY")}</td>
        <td>{moment(props.coupon.endDate).format("DD/MM/YY")}</td>
        <td>{props.coupon.amount}</td>
        <td>{`${props.coupon.price} ₪`}</td>
      </tr>
      }
      {props.screen === "AdminCustomerCouponList" &&
      <tr className="CouponRowView row-view-container">
        <td>{props.coupon.category}</td>
        <td>{props.coupon.title}</td>
        <td>{props.coupon.description}</td>
        <td>{moment(props.coupon.endDate).format("DD/MM/YY")}</td>
        <td>{`${props.coupon.price} ₪`}</td>
      </tr>
      }
  </>
  );
}

export default CouponRowView;