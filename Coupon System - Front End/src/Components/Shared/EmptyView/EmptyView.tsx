import "./EmptyView.css";
// ----------------------------------------------
import { useSelector } from "react-redux";
// ----------------------------------------------
import { EmptyViewScreenType } from "..";
import { selectIsDarkMode } from "../../../Redux";
import { Link } from "react-router-dom";

interface EmptyViewProps {
  screen: EmptyViewScreenType;
}

function EmptyView(props: EmptyViewProps): JSX.Element {
  const theme = useSelector(selectIsDarkMode) ? "dark-mode" : "light-mode";

  let text: string;
  let illustrationPath: string;
  let hasButton: boolean = true;
  let buttonText: string;
  let buttonLink: string;

  switch (props.screen) {
    case "AdminCompanies":
      text = "Add a company and it will show up here";
      theme === "light-mode"
        ? (illustrationPath =
            "/assets/images/empty_views/undraw_add_document_re_mbjx_admin_companies_light.svg")
        : (illustrationPath =
            "/assets/images/empty_views/undraw_add_document_re_mbjx_admin_companies_dark.svg");
      buttonLink = "/api/admin/companies/add";
      buttonText = "➕ Add Company";
      break;
    case "AdminCustomers":
      text = "Add a customer and it will show up here";
      theme === "light-mode"
        ? (illustrationPath =
            "/assets/images/empty_views/undraw_add_user_re_5oi_admin_customers_light.svg")
        : (illustrationPath =
            "/assets/images/empty_views/undraw_add_user_re_5oi_admin_customers_dark.svg");
      buttonLink = "/api/admin/customers/add";
      buttonText = "➕ Add Customer";
      break;
    case "CompanyCoupons":
      text = "Add a coupon and it will show up here";
      theme === "light-mode"
        ? (illustrationPath =
            "/assets/images/empty_views/undraw_add_notes_re_ln36_company_coupons_light.svg")
        : (illustrationPath =
            "/assets/images/empty_views/undraw_add_notes_re_ln36_company_coupons_dark.svg");
      buttonLink = "/api/company/coupons/add";
      buttonText = "➕ Add Coupon";
      break;
    case "CompanyCouponsFilterNoResults":
    case "CustomerCouponsFilterNoResults":
    case "CustomerCouponPoolFilterNoResults":
      text = "No Coupons Found";
      theme === "light-mode"
        ? (illustrationPath =
            "/assets/images/empty_views/undraw_void_-3-ggu_coupons_search_light.svg")
        : (illustrationPath =
            "/assets/images/empty_views/undraw_void_-3-ggu_coupons_search_dark.svg");
      hasButton = false;
      buttonLink = "";
      buttonText = "";
      break;
    case "CustomerCoupons":
      text = "Get Started, Buy your first coupon";
      theme === "light-mode"
        ? (illustrationPath =
            "/assets/images/empty_views/undraw_empty_cart_customer_coupons_light.svg")
        : (illustrationPath =
            "/assets/images/empty_views/undraw_empty_cart_customer_coupons_dark.svg");
      buttonLink = "/api/customer/couponStore";
      buttonText = "🛒 Buy First Coupon";
      break;
    case "CustomerCouponPool":
      text = "Store is empty of content";
      theme === "light-mode"
        ? (illustrationPath =
            "/assets/images/empty_views/undraw_no_data_re_kwbl_customer_couponPool_light.svg")
        : (illustrationPath =
            "/assets/images/empty_views/undraw_no_data_re_kwbl_customer_couponPool_dark.svg");
      hasButton = false;
      buttonLink = "";
      buttonText = "";
      break;
    default:
      text = "";
      illustrationPath = "";
      buttonLink = "";
      buttonText = "";
  }

  return (
    <div className="EmptyView">
      <img src={illustrationPath}></img>
      <p>{text}</p>
      {hasButton && (
        <Link to={buttonLink}>
          <button>{buttonText}</button>
        </Link>
      )}
    </div>
  );
}

export default EmptyView;
