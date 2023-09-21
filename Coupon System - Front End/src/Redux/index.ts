export type { LightingState, LoginState, CompanyListState, 
    CustomerListState, CompanyState, CouponListState, CustomerState } from './CouponAppState';

export { selectCompanyList, selectCompanyListFetchStatus, companyListReducer } from "./slices/companyListSlice"
export { fetchCompanyListAction, deleteCompanyAction, updateCompanyAction, 
    addCompanyAction, initializeCompanyListAction } from "./slices/companyListSlice"

export { selectCustomerList, selectCustomerListFetchStatus, customerListReducer } from "./slices/customerListSlice"
export { fetchCustomerListAction, deleteCustomerAction, updateCustomerAction,
    addCustomerAction, initializeCustomerListAction } from "./slices/customerListSlice"

export { selectCouponList, selectCouponListFetchStatus, couponListReducer } from "./slices/couponListSlice"
export { fetchCouponListAction, decreaseCouponAmountByOneAction, initializeCouponListAction } from "./slices/couponListSlice"

export { selectLoggedInUser, loginReducer } from "./slices/loginSlice"
export { userLoggedInAction, userLoggedOutAction, initializeLoggedInUserDetailsAction } from "./slices/loginSlice"

export { selectIsDarkMode, lightingModeReducer } from "./slices/lightingSlice"
export { changedLightingModeAction, initializeLightingModeAction } from "./slices/lightingSlice"

export { selectCompany, selectCompanyFetchStatus, companyReducer } from "./slices/companySlice";
export { fetchCompanyAction, deleteCouponAction, updateCouponAction,
    addCouponAction, initializeCompanyAction } from "./slices/companySlice";

export { selectCustomer, selectCustomerFetchStatus, customerReducer } from "./slices/customerSlice";
export { fetchCustomerAction, purchaseCouponAction, initializeCustomerAction } from "./slices/customerSlice";

export { default as store } from "./Store"
export type { RootState } from "./Store"

