package com.jb.couponSystem2.services;

import com.jb.couponSystem2.beans.Company;
import com.jb.couponSystem2.beans.Customer;
import com.jb.couponSystem2.exceptions.CouponException;

import java.util.List;

public interface AdminService {
    Company addCompany(Company company) throws CouponException;
    void updateCompany(int companyID, Company company) throws CouponException;
    void deleteCompany(int companyID) throws CouponException;
    List<Company> getAllCompanies() throws CouponException;
    Company getSingleCompany(int companyID) throws CouponException;
    Customer addCustomer(Customer customer) throws CouponException;
    void updateCustomer(int customerID, Customer customer) throws CouponException;
    void deleteCustomer(int customerID) throws CouponException;
    List<Customer> getAllCustomers() throws CouponException;
    Customer getSingleCustomer(int customerID) throws CouponException;
}
