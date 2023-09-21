import { UserModel, CompanyModel, CustomerModel, CouponModel } from "../Models";

export interface LightingState {
    isDarkMode: boolean;
}

export interface LoginState {
    loggedInUser: UserModel;
}

export interface CompanyListState { 
    companyList: CompanyModel[];
    hasMadeInitialFetch: boolean;
}

export interface CustomerListState {
    customerList: CustomerModel[];
    hasMadeInitialFetch: boolean;
}

export interface CompanyState {
    company: CompanyModel;
    hasMadeInitialFetch: boolean;
}

export interface CustomerState {
    customer: CustomerModel;
    hasMadeInitialFetch: boolean;
}

export interface CouponListState {
    couponList: CouponModel[];
    hasMadeInitialFetch: boolean;
}