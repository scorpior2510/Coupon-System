package com.jb.couponSystem2.services;

import com.jb.couponSystem2.beans.Category;
import com.jb.couponSystem2.beans.Company;
import com.jb.couponSystem2.beans.Coupon;
import com.jb.couponSystem2.beans.Customer;
import com.jb.couponSystem2.exceptions.CouponException;
import com.jb.couponSystem2.exceptions.ErrorMsg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Service
public class CompanyServiceImpl extends ClientService implements CompanyService {
    @Override
    public void addCoupon(int companyID, Coupon coupon) throws CouponException {
        Company company = companyRepository.findById(companyID).orElseThrow(() -> new CouponException(ErrorMsg.ADD_COUPON_COMPANY_DOES_NOT_EXIST));
        if (this.couponRepository.existsByTitleAndCompanyId(coupon.getTitle(), companyID)) {
            throw new CouponException(ErrorMsg.ADD_COUPON_TITLE_FOR_COMPANY_ALREADY_EXISTS);
        }
        company.addCoupon(coupon);
        this.companyRepository.save(company);
    }
    @Override
    public Coupon addCouponV2(int companyID, Coupon coupon) throws CouponException {
        Company company = companyRepository.findById(companyID).orElseThrow(() -> new CouponException(ErrorMsg.ADD_COUPON_COMPANY_DOES_NOT_EXIST));
        if (this.couponRepository.existsByTitleAndCompanyId(coupon.getTitle(), companyID)) {
            throw new CouponException(ErrorMsg.ADD_COUPON_TITLE_FOR_COMPANY_ALREADY_EXISTS);
        }
        company.addCoupon(coupon);
        return this.couponRepository.save(coupon);
    }
    @Override
    public void updateCoupon(int companyID, int couponID, Coupon coupon) throws CouponException {
        Coupon retrievedCoupon = couponRepository.findById(couponID).orElseThrow(() -> new CouponException(ErrorMsg.UPDATE_COUPON_DOES_NOT_EXIST));
        if (couponID != coupon.getId()) {
            throw new CouponException(ErrorMsg.UPDATE_COUPON_CHANGING_ID_IS_NOT_ALLOWED);
        }
        if (retrievedCoupon.getCompany().getId() != companyID) {
            throw new CouponException(ErrorMsg.UPDATE_COUPON_CHANGING_ANOTHER_COMPANY_COUPON_IS_NOT_ALLOWED);
        }
        Company retrievedCompany = this.companyRepository.findById(companyID).orElseThrow(() -> new CouponException(ErrorMsg.UPDATE_COUPON_COMPANY_DOES_NOT_EXIST));
        coupon.setCompany(retrievedCompany);
        couponRepository.saveAndFlush(coupon);
    }
    @Override
    public void deleteCoupon(int companyID, int couponID) throws CouponException {
        Coupon retrievedCoupon = couponRepository.findById(couponID).orElseThrow(() -> new CouponException(ErrorMsg.DELETE_COUPON_DOES_NOT_EXIST));
        if (retrievedCoupon.getCompany().getId() != companyID) {
            throw new CouponException(ErrorMsg.DELETE_COUPON_DELETING_ANOTHER_COMPANY_COUPON_IS_NOT_ALLOWED);
        }
        List<Customer> customers = retrievedCoupon.removeAllCustomers();
        this.customerRepository.saveAll(customers);
        this.couponRepository.deleteById(couponID);
    }
    @Override
    public List<Coupon> getCompanyCoupons(int companyID) throws CouponException {
        List<Coupon> coupons = this.couponRepository.findByCompanyId(companyID);
        if (coupons.isEmpty()) {
            throw new CouponException(ErrorMsg.RETRIEVE_COUPONS_NO_COUPONS_FOR_THIS_COMPANY);
        }
        return coupons;
    }
    @Override
    public List<Coupon> getCompanyCoupons(int companyID, Category category) throws CouponException {
        List<Coupon> coupons = this.couponRepository.findByCategoryAndCompanyId(category, companyID);
        if (coupons.isEmpty()) {
            throw new CouponException(ErrorMsg.RETRIEVE_COUPONS_BY_CATEGORY_NO_COUPONS_FOR_THIS_COMPANY);
        }
        return coupons;
    }
    @Override
    public List<Coupon> getCompanyCoupons(int companyID, double maxPrice) throws CouponException {
        List<Coupon> coupons = this.couponRepository.findByCompanyIdAndPriceLessThan(companyID, maxPrice);
        if (coupons.isEmpty()) {
            throw new CouponException(ErrorMsg.RETRIEVE_COUPONS_BY_MAX_PRICE_NO_COUPONS_FOR_THIS_COMPANY);
        }
        return coupons;
    }
    @Override
    public Company getCompanyDetails(int companyID) throws CouponException {
        return this.companyRepository.findById(companyID).orElseThrow(() -> new CouponException(ErrorMsg.NO_SUCH_COMPANY_EXISTS));
    }
}
