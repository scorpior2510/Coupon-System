package com.jb.couponSystem2.services;

import com.jb.couponSystem2.beans.Category;
import com.jb.couponSystem2.beans.Coupon;
import com.jb.couponSystem2.beans.Customer;
import com.jb.couponSystem2.exceptions.CouponException;
import com.jb.couponSystem2.exceptions.ErrorMsg;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service
public class CustomerServiceImpl extends ClientService implements CustomerService {
    @Override
    public void purchaseCoupon(int customerID, Coupon coupon) throws CouponException {
        if (!couponRepository.existsById(coupon.getId())) {
            throw new CouponException(ErrorMsg.PURCHASE_COUPON_DOES_NOT_EXIST);
        }
        if (couponRepository.existsByIdAndCustomersId(coupon.getId(), customerID)) {
            throw new CouponException(ErrorMsg.PURCHASE_COUPON_LIMIT_OF_ONE_PER_CUSTOMER);
        }
        if (coupon.getAmount() == 0) {
            throw new CouponException(ErrorMsg.PURCHASE_COUPON_RAN_OUT);
        }
        if (coupon.getEndDate().before(Date.valueOf(LocalDate.now()))) {
            throw new CouponException(ErrorMsg.PURCHASE_COUPON_EXPIRED);
        }

        Customer retrievedCustomer = this.customerRepository.findById(customerID).orElseThrow(() -> new CouponException(ErrorMsg.NO_CUSTOMER_MATCHING_REQUEST));
        Coupon retrievedCoupon = this.couponRepository.findById(coupon.getId()).orElseThrow(() -> new CouponException(ErrorMsg.PURCHASE_COUPON_DOES_NOT_EXIST));
        retrievedCoupon.setAmount(retrievedCoupon.getAmount() - 1);
        retrievedCustomer.addCoupon(retrievedCoupon);
        this.couponRepository.save(retrievedCoupon);
        this.customerRepository.save(retrievedCustomer);
    }
    @Override
    public List<Coupon> getCustomerCoupons(int customerID) throws CouponException {
        List<Coupon> coupons = this.couponRepository.findByCustomersId(customerID);
        if (coupons.isEmpty()) {
            throw new CouponException(ErrorMsg.RETRIEVE_COUPONS_NO_COUPONS_FOR_THIS_CUSTOMER);
        }
        return coupons;
    }
    @Override
    public List<Coupon> getAllCoupons() throws CouponException {
        List<Coupon> coupons = this.couponRepository.findAll();
        if (coupons.isEmpty()) {
            throw new CouponException(ErrorMsg.RETRIEVE_COUPONS_NO_COUPONS_IN_DB);
        }
        return coupons;
    }
    @Override
    public List<Coupon> getCustomerCoupons(int customerID, Category category) throws CouponException {
        List<Coupon> coupons = this.couponRepository.findByCategoryAndCustomersId(category, customerID);
        if (coupons.isEmpty()) {
            throw new CouponException(ErrorMsg.RETRIEVE_COUPONS_IN_CATEGORY_NO_COUPONS_FOR_THIS_CUSTOMER);
        }
        return coupons;
    }
    @Override
    public List<Coupon> getCustomerCoupons(int customerID, double maxPrice) throws CouponException {
        List<Coupon> coupons = this.couponRepository.findByCustomersIdAndPriceLessThan(customerID, maxPrice);
        if (coupons.isEmpty()) {
            throw new CouponException(ErrorMsg.RETRIEVE_COUPONS_UNDER_PRICE_NO_COUPONS_FOR_THIS_CUSTOMER);
        }
        return coupons;
    }
    @Override
    public Customer getCustomerDetails(int customerID) throws CouponException {
        return customerRepository.findById(customerID).orElseThrow(() -> new CouponException(ErrorMsg.NO_SUCH_CUSTOMER_EXISTS));
    }
}
