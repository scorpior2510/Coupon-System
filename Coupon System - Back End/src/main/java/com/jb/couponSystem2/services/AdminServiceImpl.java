package com.jb.couponSystem2.services;

import com.jb.couponSystem2.beans.Company;
import com.jb.couponSystem2.beans.Coupon;
import com.jb.couponSystem2.beans.Customer;
import com.jb.couponSystem2.exceptions.CouponException;
import com.jb.couponSystem2.exceptions.ErrorMsg;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminServiceImpl extends ClientService implements AdminService {

    @Override
    public Company addCompany(Company company) throws CouponException {
        if (this.companyRepository.existsById(company.getId())) {
            throw new CouponException(ErrorMsg.ADD_COMPANY_ID_ALREADY_EXISTS);
        }
        if (this.companyRepository.existsByName(company.getName())) {
            throw new CouponException(ErrorMsg.ADD_COMPANY_NAME_ALREADY_EXISTS);
        }
        if (this.companyRepository.existsByEmail(company.getEmail())) {
            throw new CouponException(ErrorMsg.ADD_COMPANY_EMAIL_ALREADY_EXISTS);
        }
        return this.companyRepository.save(company);
    }
    @Override
    public void updateCompany(int companyID, Company company) throws CouponException {
        Company retrievedCompany = this.companyRepository.findById(companyID).orElseThrow(() -> new CouponException(ErrorMsg.UPDATE_COMPANY_DOES_NOT_EXIST));
        if (companyID != company.getId()) {
            throw new CouponException(ErrorMsg.UPDATE_COMPANY_CHANGING_ID_IS_NOT_ALLOWED);
        }
        if (!retrievedCompany.getName().equals(company.getName())) {
            throw new CouponException(ErrorMsg.UPDATE_COMPANY_CHANGING_NAME_IS_NOT_ALLOWED);
        }
        this.companyRepository.saveAndFlush(company);
    }
    @Override
    public void deleteCompany(int companyID) throws CouponException {
        if (!this.companyRepository.existsById(companyID)) {
            throw new CouponException(ErrorMsg.DELETE_COMPANY_DOES_NOT_EXIST);
        }

        List<Coupon> coupons = this.couponRepository.findByCompanyId(companyID);
        List<Customer> changedCustomers = new ArrayList<>();
        coupons.forEach(coupon -> changedCustomers.addAll(coupon.removeAllCustomers()));

        customerRepository.saveAll(changedCustomers);
        couponRepository.saveAll(coupons);
        this.companyRepository.deleteById(companyID);
    }
    @Override
    public List<Company> getAllCompanies() throws CouponException {
        List<Company> companies = companyRepository.findAll();
        if (companies.isEmpty()) {
            throw new CouponException(ErrorMsg.NO_COMPANIES_MATCHING_REQUEST);
        }
        return companies;
    }
    @Override
    public Company getSingleCompany(int companyID) throws CouponException {
        Company company = this.companyRepository.findById(companyID).orElseThrow(() -> new CouponException(ErrorMsg.NO_COMPANY_MATCHING_REQUEST));
        return company;
    }
    @Override
    public Customer addCustomer(Customer customer) throws CouponException {
        if (this.customerRepository.existsById(customer.getId())) {
            throw new CouponException(ErrorMsg.ADD_CUSTOMER_ID_ALREADY_EXISTS);
        }
        if (this.customerRepository.existsByEmail(customer.getEmail())) {
            throw new CouponException(ErrorMsg.ADD_CUSTOMER_EMAIL_ALREADY_EXISTS);
        }
        return this.customerRepository.save(customer);
    }
    @Override
    public void updateCustomer(int customerID, Customer customer) throws CouponException {
        if (!this.customerRepository.existsById(customerID)) {
            throw new CouponException(ErrorMsg.UPDATE_CUSTOMER_DOES_NOT_EXIST);
        }
        if (customerID != customer.getId()) {
            throw new CouponException(ErrorMsg.UPDATE_CUSTOMER_CHANGING_ID_IS_NOT_ALLOWED);
        }
        this.customerRepository.saveAndFlush(customer);
    }
    @Override
    public void deleteCustomer(int customerID) throws CouponException {
        Customer customer = this.customerRepository.findById(customerID).orElseThrow(() -> new CouponException(ErrorMsg.DELETE_CUSTOMER_DOES_NOT_EXIST));
        customer.removeAllCoupons();
        this.customerRepository.save(customer);
        this.customerRepository.deleteById(customerID);
    }
    @Override
    public List<Customer> getAllCustomers() throws CouponException {
        List<Customer> customers = this.customerRepository.findAll();
        if (customers.isEmpty()) {
            throw new CouponException(ErrorMsg.NO_CUSTOMERS_MATCHING_REQUEST);
        }
        return customers;
    }
    @Override
    public Customer getSingleCustomer(int customerID) throws CouponException {
        return this.customerRepository.findById(customerID).orElseThrow(() -> new CouponException(ErrorMsg.NO_CUSTOMER_MATCHING_REQUEST));
    }
}
