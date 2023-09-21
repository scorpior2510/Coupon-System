class UrlService {
    
    public urlRoot = "http://localhost:8080/api";
    public urlLogin = this.urlRoot + "/auth/login"

    public urlRootAdmin = this.urlRoot + "/admin"
    public urlAdminCompanies = this.urlRootAdmin + "/companies"
    public urlAdminCustomers = this.urlRootAdmin + "/customers"
    
    public urlRootCompany = this.urlRoot + "/company"
    public urlCompanyCoupons = this.urlRootCompany + "/coupons"
    public urlCompanyDetails = this.urlRootCompany + "/details"

    public urlRootCustomer = this.urlRoot + "/customer"
    public urlCustomerCouponsTrade = this.urlRootCustomer + "/coupons/trade"
    public urlCustomerDetails = this.urlRootCustomer + "/details"
    public urlCustomerCouponPool = this.urlRootCustomer + "/couponStore"
}

const urlService = new UrlService();
export default urlService;