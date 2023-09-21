import "./CouponListTableView.css";
// ----------------------------------------------
import { CouponRowView } from "..";
import { CouponModel } from "../../../Models";
import { CouponScreenType } from "../../Shared";

interface CouponListTableViewProps {
  couponList: CouponModel[];
  screen: CouponScreenType;
}

function CouponListTableView(props: CouponListTableViewProps): JSX.Element {
  const couponCount = () => props.couponList.length;
    return (
        <div className="CouponListTableView table-view-container">
      <table>
        <thead>
          {props.screen === "AdminCompanyCouponList" && 
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Title</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Amount</th>
            <th>Price</th>
          </tr>
          }
          {props.screen === "AdminCustomerCouponList" && 
          <tr>
            <th>Category</th>
            <th>Title</th>
            <th>Description</th>
            <th>Expiration Date</th>
            <th>Price</th>
          </tr>
          }
        </thead>
        <tbody>
          {props.couponList.map((coupon, idx) => (
            <CouponRowView
              key={`coupon-table-row-${idx}`}
              coupon={coupon}
              screen={props.screen}
            />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Count:</td>
            <td>{couponCount()}</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tfoot>
      </table>
			
        </div>
    );
}

export default CouponListTableView;