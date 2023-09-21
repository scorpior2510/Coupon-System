import axios, { AxiosResponse } from "axios";
// ----------------------------------------------
import { urlService } from ".";
import { LoginReqModel, LoginResModel, CompanyModel, CustomerModel, CouponModel } from "../Models";
import { store } from "../Redux";

class WebApiService {

    //Admin Api

    public login(loginRequest: LoginReqModel): Promise<AxiosResponse<LoginResModel>> {
        return axios.post<LoginResModel>(urlService.urlLogin, loginRequest);
    }

    public addCompany(company: CompanyModel): Promise<AxiosResponse<CompanyModel>> {
        const headers = { 'Authorization': store.getState().loggedInUserDetails.loggedInUser.token }
        return axios.post<CompanyModel>(urlService.urlAdminCompanies, company, { headers });
    }
    
    public updateCompany(id: number, company: CompanyModel): Promise<AxiosResponse<any>> {
        const headers = { 'Authorization': store.getState().loggedInUserDetails.loggedInUser.token }
        return axios.put<any>(urlService.urlAdminCompanies + "/" + id, company, { headers });
    }
    
    public deleteCompany(id: number): Promise<AxiosResponse<any>> {
        const headers = { 'Authorization': store.getState().loggedInUserDetails.loggedInUser.token }
        return axios.delete<any>(urlService.urlAdminCompanies + "/" + id, { headers });
    }
    
    public getAllCompanies(): Promise<AxiosResponse<CompanyModel[]>> {
        const headers = { 'Authorization': store.getState().loggedInUserDetails.loggedInUser.token }
        return axios.get<CompanyModel[]>(urlService.urlAdminCompanies, { headers });
    }

    public addCustomer(customer: CustomerModel): Promise<AxiosResponse<CustomerModel>> {
        const headers = { 'Authorization': store.getState().loggedInUserDetails.loggedInUser.token }
        return axios.post<CustomerModel>(urlService.urlAdminCustomers, customer, { headers });
    }
    
    public updateCustomer(id: number, customer: CustomerModel): Promise<AxiosResponse<any>> {
        const headers = { 'Authorization': store.getState().loggedInUserDetails.loggedInUser.token }
        return axios.put<any>(urlService.urlAdminCustomers + "/" + id, customer, { headers });
    }
    
    public deleteCustomer(id: number): Promise<AxiosResponse<any>> {
        const headers = { 'Authorization': store.getState().loggedInUserDetails.loggedInUser.token }
        return axios.delete<any>(urlService.urlAdminCustomers + "/" + id, { headers });
    }
    
    public getAllCustomers(): Promise<AxiosResponse<CustomerModel[]>> {
        const headers = { 'Authorization': store.getState().loggedInUserDetails.loggedInUser.token }
        return axios.get<CustomerModel[]>(urlService.urlAdminCustomers, { headers });
    }

    //Company Api

    public addCoupon(coupon: CouponModel): Promise<AxiosResponse<CouponModel>> {
        const headers = { 'Authorization': store.getState().loggedInUserDetails.loggedInUser.token }
        return axios.post<CouponModel>(urlService.urlCompanyCoupons, coupon, { headers });
    }
    
    public updateCoupon(id: number, coupon: CouponModel): Promise<AxiosResponse<any>> {
        const headers = { 'Authorization': store.getState().loggedInUserDetails.loggedInUser.token }
        return axios.put<any>(urlService.urlCompanyCoupons + "/" + id, coupon, { headers });
    }
    
    public deleteCoupon(id: number): Promise<AxiosResponse<any>> {
        const headers = { 'Authorization': store.getState().loggedInUserDetails.loggedInUser.token }
        return axios.delete<any>(urlService.urlCompanyCoupons + "/" + id, { headers });
    }
    
    public getCompanyDetails(): Promise<AxiosResponse<CompanyModel>> {
        const headers = { 'Authorization': store.getState().loggedInUserDetails.loggedInUser.token }
        return axios.get<CompanyModel>(urlService.urlCompanyDetails, { headers });
    }

    //Customer Api

    public getCustomerDetails(): Promise<AxiosResponse<CustomerModel>> {
        const headers = { 'Authorization': store.getState().loggedInUserDetails.loggedInUser.token }
        return axios.get<CustomerModel>(urlService.urlCustomerDetails, { headers });
    }

    public purchaseCoupon(coupon: CouponModel): Promise<AxiosResponse<CouponModel>> {
        const headers = { 'Authorization': store.getState().loggedInUserDetails.loggedInUser.token };
        return axios.post<CouponModel>(urlService.urlCustomerCouponsTrade, coupon, { headers });
    }

    public getAllCoupons(): Promise<AxiosResponse<CouponModel[]>> {
        const headers = { 'Authorization': store.getState().loggedInUserDetails.loggedInUser.token }
        return axios.get<CouponModel[]>(urlService.urlCustomerCouponPool, { headers });
    }
    
}

const webApiService = new WebApiService();
export default webApiService;