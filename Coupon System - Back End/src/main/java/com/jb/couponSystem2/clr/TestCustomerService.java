package com.jb.couponSystem2.clr;

import com.jb.couponSystem2.beans.Category;
import com.jb.couponSystem2.beans.Coupon;
import com.jb.couponSystem2.beans.Customer;
import com.jb.couponSystem2.exceptions.CouponException;
import com.jb.couponSystem2.repositories.CouponRepository;
import com.jb.couponSystem2.services.CustomerService;
import com.jb.couponSystem2.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.Arrays;

//@Component
@Order(120)
public class TestCustomerService implements CommandLineRunner {
    @Autowired
    private Utils utils;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private CouponRepository couponRepository;

    public void testPurchaseCoupon() {
        utils.testTitle("start", "CustomerService", "purchaseCoupon");

        utils.testCase();
        System.out.println("Customer 29 tries buying coupon 74");
        Coupon coupon = couponRepository.findById(74).get();
        try {
            customerService.purchaseCoupon(29, coupon);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }

        utils.testCase();
        System.out.println("Customer 29 tries buying coupon 17 which amount is set to 0");
        coupon = couponRepository.findById(17).get();
        coupon.setAmount(0);
        couponRepository.saveAndFlush(coupon);
        coupon = couponRepository.findById(17).get();
        try {
            customerService.purchaseCoupon(29, coupon);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }

        utils.testCase();
        System.out.println("Customer 29 tries buying coupon which is set to being expired:");
        coupon = couponRepository.findById(16).get();
        coupon.setStartDate(utils.getRandPastStartDate());
        coupon.setEndDate(utils.getRandPastEndDate());
        couponRepository.saveAndFlush(coupon);
        coupon = couponRepository.findById(16).get();
        try {
            customerService.purchaseCoupon(29, coupon);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }

        utils.testCase();
        System.out.println("Customer 29 tries buying coupon 96");
        coupon = couponRepository.findById(96).get();
        try {
            customerService.purchaseCoupon(29, coupon);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }
        System.out.println("Success");

        utils.testTitle("end", "CustomerService", "purchaseCoupon");
    }
    public void testGetCustomerCoupons() {
        utils.testTitle("start", "CustomerService", "getCustomerCoupons");

        System.out.println("Analyzing customer 30\n");

        utils.testCase();
        System.out.println("All Customer 30 Coupons:");
        try {
            customerService.getCustomerCoupons(30).forEach(System.out::println);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }

        utils.testCase();
        System.out.println("Customer 30 Coupons by Category:");
        Arrays.stream(Category.values()).toList().forEach(category -> {
            try {
                System.out.println(customerService.getCustomerCoupons(30, category));
            } catch (CouponException e) {
                System.out.println(e.getMessage());
            }
        });

        utils.testCase();
        System.out.println("Customer 30 Coupons Under price of 10");
        try {
            customerService.getCustomerCoupons(30, 10).forEach(System.out::println);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }
        System.out.println("\nCustomer 30 Coupons Under price of 100");
        try {
            customerService.getCustomerCoupons(30, 100).forEach(System.out::println);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }
        System.out.println("\nCustomer 30 Coupons Under price of 160");
        try {
            customerService.getCustomerCoupons(30, 160).forEach(System.out::println);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }

        utils.testTitle("end", "CustomerService", "getCustomerCoupons");
    }
    public void testGetCustomerDetails() {
        utils.testTitle("start", "CustomerService", "getCustomerDetails");

        utils.testCase();
        Customer customer = null;
        try {
            customer = customerService.getCustomerDetails(31);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }
        System.out.println("Customer 31 Details:");
        System.out.println(customer);
        customer.getCoupons().forEach(System.out::println);

        utils.testTitle("end", "CustomerService", "getCustomerDetails");
    }

    @Override
    public void run(String... args) throws Exception {
        testPurchaseCoupon();
        testGetCustomerCoupons();
        testGetCustomerDetails();
    }
}
