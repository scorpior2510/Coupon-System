package com.jb.couponSystem2.services;

import com.jb.couponSystem2.beans.Category;
import com.jb.couponSystem2.beans.Company;
import com.jb.couponSystem2.beans.Coupon;
import com.jb.couponSystem2.exceptions.CouponException;

import java.util.List;

public interface CompanyService {
    void addCoupon(int companyID, Coupon coupon) throws CouponException;
    Coupon addCouponV2(int companyID, Coupon coupon) throws CouponException;
    void updateCoupon(int companyID, int couponID, Coupon coupon) throws CouponException;
    void deleteCoupon(int companyID, int couponID) throws CouponException;
    List<Coupon> getCompanyCoupons(int companyID) throws CouponException;
    List<Coupon> getCompanyCoupons(int companyID, Category category) throws CouponException;
    List<Coupon> getCompanyCoupons(int companyID, double maxPrice) throws CouponException;
    Company getCompanyDetails(int companyID) throws CouponException;
}
