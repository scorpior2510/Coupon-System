import "./CouponCardView.css";
// ----------------------------------------------
import moment from "moment";
import { Link } from "react-router-dom";
// ----------------------------------------------
import { Category, CouponModel } from "../../../Models";
import { useSelector } from "react-redux";
import { selectCustomer } from "../../../Redux";
import { CouponScreenType } from "../../Shared";

interface CouponCardViewProps {
  coupon: CouponModel;
  screen: CouponScreenType;
}

function CouponCardView(props: CouponCardViewProps): JSX.Element {

  const loggedInCustomerCouponIDs: Array<number> = useSelector(selectCustomer).coupons.map(coupon => coupon.id);

  const couponAdditionalClasses = () => {
    let couponAdditionalClasses: string = "";
    if (props.screen === "CustomerCouponListAll") {
      if (loggedInCustomerCouponIDs.includes(props.coupon.id)) {
        couponAdditionalClasses += " dimmed-coupon";
      }
    }
    if (props.coupon.amount === 0) {
      couponAdditionalClasses += " out-of-stock-coupon";
    }
    return couponAdditionalClasses;
  }

  const couponImagePath: string = "/assets/images/coupons/" + props.coupon.image.substring(54);
  const couponCategoryEmoji = () => {
    switch (props.coupon.category) {
      case (Category.BOOKS):
        return "📚";
      case (Category.CLOTHING):
        return "👕";
      case (Category.COMPUTERS_AND_PHONES):
        return "💻/📱";
      case (Category.ELECTRICITY):
        return "⚡";
      case (Category.FOOD):
        return "🍔";
      case (Category.HOME_FURNITURE):
        return "🪑";
      case (Category.SPA_AND_BEAUTY):
        return "🌸";
      case (Category.TOYS):
        return "🧸";
      case (Category.VACATION):
        return "😎";
    }
  };

  const isCouponAboutToExpire = () => {
    let date = new Date();
    const dateInAWeek = moment(date).add(7, 'days').toDate();
    const dateCouponExpires = moment(props.coupon.endDate).toDate();
    return dateCouponExpires < dateInAWeek;
  }

  return (
    <div className={`CouponCardView card-view-container ${couponAdditionalClasses()}`}>
      {props.screen === "CompanyCouponList" && 
      <>
        <h3>{props.coupon.title}</h3>
        <p>{`${couponCategoryEmoji()} ${props.coupon.category} `}</p>
        <p>{`💬 ${props.coupon.description}`}</p>
        <p>{`⌛ Validity Period: ${moment(props.coupon.startDate).format("DD/MM/YY")} - ${moment(props.coupon.endDate).format("DD/MM/YY")}`}</p>
        <p>{`🤏🏻 Amount: ${props.coupon.amount}`}</p>
        <p>{`💲 Price: ${props.coupon.price}`}</p>
        <img src={couponImagePath} alt={props.coupon.title} />
        <div>
          <Link to={`/api/company/coupons/update/${props.coupon.id}`}><button>🖊️ Edit</button></Link>
          <Link to={`/api/company/coupons/delete/${props.coupon.id}`}><button>🗑️ Delete</button></Link>
        </div>
      </>
      }
      {(props.screen === "CustomerCouponList" || props.screen === "CustomerCouponListAll" || props.screen === "CustomerCouponPurchaseConfirmation") && 
      <>
        <h3>{props.coupon.title}</h3>
        <p>{`${couponCategoryEmoji()} ${props.coupon.category} `}</p>
        <p>{`💬 ${props.coupon.description}`}</p>
        <p>{`⌛ Expires On: ${moment(props.coupon.endDate).format("DD/MM/YY")}`}</p>
        {props.screen === "CustomerCouponListAll" &&
        <p>{`🤏🏻 Left In Stock: ${props.coupon.amount}`}</p>
        }
        {props.screen === "CustomerCouponListAll" &&
        <p>{`💲 Price: ${props.coupon.price} ₪`}</p>
        }
        <img src={couponImagePath} alt={props.coupon.title} />
        { props.screen === "CustomerCouponList" && isCouponAboutToExpire() &&
        <p className="coupon-about-to-expire-message">Coupon is about to expire!</p>
        }
        { props.screen === "CustomerCouponListAll" && couponAdditionalClasses().length < 2 &&
        <div>
          <Link to={`/api/customer/couponStore/${props.coupon.id}`}><button>🛒 Buy</button></Link>
        </div>
        }
      </>
      }
    </div>
  );
}

export default CouponCardView;
