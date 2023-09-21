import "./Routing.css";
// ----------------------------------------------
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
// ----------------------------------------------
import { ClientType } from "../../../Models";
import { selectLoggedInUser } from "../../../Redux";
import { LoginForm, LogoutConfirmation } from "../../Auth";
import { CompanyListContainerAll, CompanyDeleteConfirmation, 
  CompanyUpdateForm, CompanyAddForm, CompanyDetailsContainer, CompanyFocusedViewAdmin } from "../../Company";
import { CustomerDeleteConfirmation, CustomerUpdateForm, 
  CustomerListContainerAll, CustomerAddForm, CustomerDetailsContainer, CustomerFocusedViewAdmin } from "../../Customer";
import { About, Home, Page404, PageServerDown } from "../../Pages";
import App from "../../../App";
import { CouponAddForm, CouponDeleteConfirmation, CouponListContainerAll, CouponListContainerCo, 
  CouponListContainerCu, CouponPurchaseConfirmation, CouponUpdateForm } from "../../Coupon";

function Routing(): JSX.Element {

  const loggedInUserClientType: ClientType = useSelector(selectLoggedInUser).clientType;
  const isClientTypeCustomer: boolean = loggedInUserClientType === ClientType.CUSTOMER;
  const isClientTypeCompany: boolean = loggedInUserClientType === ClientType.COMPANY;
  const isClientTypeAdmin: boolean = loggedInUserClientType === ClientType.ADMINISTRATOR;

  return (
    <div className="Routing">
      <Routes>
        <Route index element={<Home />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/server/down" element={<PageServerDown />} />
        <Route path="/" element={<App />} />

        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        
        <Route path="/api/auth/login" element={<LoginForm />} />
        <Route path="/api/auth/login/:clientType" element={<LoginForm />} />
        <Route path="/api/auth/logout" element={<LogoutConfirmation />} />
        
        {isClientTypeAdmin && <Route path="/api/admin/home" element={<Home />} />}
        {isClientTypeAdmin && <Route path="/api/admin/companies" element={<CompanyListContainerAll />} />}
        {isClientTypeAdmin && <Route path="/api/admin/companies/:id" element={<CompanyFocusedViewAdmin />} />}
        {isClientTypeAdmin && <Route path="/api/admin/companies/delete/:id" element={<CompanyDeleteConfirmation />} />}
        {isClientTypeAdmin && <Route path="/api/admin/companies/update/:id" element={<CompanyUpdateForm />} />}
        {isClientTypeAdmin && <Route path="/api/admin/customers" element={<CustomerListContainerAll />} />}
        {isClientTypeAdmin && <Route path="/api/admin/customers/:id" element={<CustomerFocusedViewAdmin />} />}
        {isClientTypeAdmin && <Route path="/api/admin/customers/delete/:id" element={<CustomerDeleteConfirmation />} />}
        {isClientTypeAdmin && <Route path="/api/admin/customers/update/:id" element={<CustomerUpdateForm />} />}
        {isClientTypeAdmin && <Route path="/api/admin/companies/add" element={<CompanyAddForm />} />}
        {isClientTypeAdmin && <Route path="/api/admin/customers/add" element={<CustomerAddForm />} />}

        {isClientTypeCompany && <Route path="/api/company/home" element={<Home />} />}
        {isClientTypeCompany && <Route path="/api/company/details" element={<CompanyDetailsContainer />} />}
        {isClientTypeCompany && <Route path="/api/company/coupons" element={<CouponListContainerCo />} />}
        {isClientTypeCompany && <Route path="/api/company/coupons/add" element={<CouponAddForm />} />}
        {isClientTypeCompany && <Route path="/api/company/coupons/delete/:id" element={<CouponDeleteConfirmation />} />}
        {isClientTypeCompany && <Route path="/api/company/coupons/update/:id" element={<CouponUpdateForm />} />}

        {isClientTypeCustomer && <Route path="/api/customer/home" element={<Home />} />}
        {isClientTypeCustomer && <Route path="/api/customer/details" element={<CustomerDetailsContainer />} />}
        {isClientTypeCustomer && <Route path="/api/customer/coupons" element={<CouponListContainerCu />} />}
        {isClientTypeCustomer && <Route path="/api/customer/couponStore" element={<CouponListContainerAll />} />}
        {isClientTypeCustomer && <Route path="/api/customer/couponStore/:id" element={<CouponPurchaseConfirmation />} />}
      </Routes>
    </div>
  );
}

export default Routing;
