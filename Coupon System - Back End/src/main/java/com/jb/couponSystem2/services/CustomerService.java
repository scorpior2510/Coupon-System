package com.jb.couponSystem2.services;

import com.jb.couponSystem2.beans.Category;
import com.jb.couponSystem2.beans.Coupon;
import com.jb.couponSystem2.beans.Customer;
import com.jb.couponSystem2.exceptions.CouponException;

import java.util.List;

public interface CustomerService {
    void purchaseCoupon(int customerID, Coupon coupon) throws CouponException;
    List<Coupon> getCustomerCoupons(int customerID) throws CouponException;
    List<Coupon> getAllCoupons() throws CouponException;
    List<Coupon> getCustomerCoupons(int customerID, Category category) throws CouponException;
    List<Coupon> getCustomerCoupons(int customerID, double maxPrice) throws CouponException;
    Customer getCustomerDetails(int customerID) throws CouponException;
}
