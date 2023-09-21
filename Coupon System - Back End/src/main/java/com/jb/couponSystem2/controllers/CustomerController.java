package com.jb.couponSystem2.controllers;

import com.jb.couponSystem2.beans.Category;
import com.jb.couponSystem2.beans.Coupon;
import com.jb.couponSystem2.beans.Customer;
import com.jb.couponSystem2.exceptions.CouponException;
import com.jb.couponSystem2.exceptions.ErrorMsg;
import com.jb.couponSystem2.security.ClientType;
import com.jb.couponSystem2.security.TokenService;
import com.jb.couponSystem2.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping(path = "api/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;
    @Autowired
    private TokenService tokenService;

    @PostMapping(path = "/coupons/trade")
    @ResponseStatus(HttpStatus.CREATED)
    public void purchaseCoupon(@RequestHeader(value = "Authorization") UUID token, @RequestBody Coupon coupon) throws CouponException {
        if (!tokenService.authorized(ClientType.CUSTOMER, token)) {
            throw new CouponException(ErrorMsg.SECURITY_UNAUTHORIZED);
        }
        int customerID = tokenService.getIdByToken(token);
        customerService.purchaseCoupon(customerID, coupon);
    }

    @GetMapping(path = "/coupons")
    @ResponseStatus(HttpStatus.OK)
    public List<Coupon> getCustomerCoupons(@RequestHeader(value = "Authorization") UUID token) throws CouponException {
        if (!tokenService.authorized(ClientType.CUSTOMER, token)) {
            throw new CouponException(ErrorMsg.SECURITY_UNAUTHORIZED);
        }
        int customerID = tokenService.getIdByToken(token);
        return customerService.getCustomerCoupons(customerID);
    }

    @GetMapping(path = "/couponStore")
    @ResponseStatus(HttpStatus.OK)
    public List<Coupon> getAllCoupons(@RequestHeader(value = "Authorization") UUID token) throws CouponException {
        if (!tokenService.authorized(ClientType.CUSTOMER, token)) {
            throw new CouponException(ErrorMsg.SECURITY_UNAUTHORIZED);
        }
        int customerID = tokenService.getIdByToken(token);
        return customerService.getAllCoupons();
    }

    @GetMapping(path = "/coupons", params = "category")
    @ResponseStatus(HttpStatus.OK)
    public List<Coupon> getCustomerCoupons(@RequestHeader(value = "Authorization") UUID token, @RequestParam(required = false) Category category) throws CouponException {
        if (!tokenService.authorized(ClientType.CUSTOMER, token)) {
            throw new CouponException(ErrorMsg.SECURITY_UNAUTHORIZED);
        }
        int customerID = tokenService.getIdByToken(token);
        return customerService.getCustomerCoupons(customerID, category);
    }

    @GetMapping(path = "/coupons", params = "maxPrice")
    @ResponseStatus(HttpStatus.OK)
    public List<Coupon> getCustomerCoupons(@RequestHeader(value = "Authorization") UUID token, @RequestParam(required = false) double maxPrice) throws CouponException {
        if (!tokenService.authorized(ClientType.CUSTOMER, token)) {
            throw new CouponException(ErrorMsg.SECURITY_UNAUTHORIZED);
        }
        int customerID = tokenService.getIdByToken(token);
        return customerService.getCustomerCoupons(customerID, maxPrice);
    }

    @GetMapping(path = "/details")
    @ResponseStatus(HttpStatus.OK)
    public Customer getCustomerDetails(@RequestHeader(value = "Authorization") UUID token) throws CouponException {
        if (!tokenService.authorized(ClientType.CUSTOMER, token)) {
            throw new CouponException(ErrorMsg.SECURITY_UNAUTHORIZED);
        }
        int customerID = tokenService.getIdByToken(token);
        return customerService.getCustomerDetails(customerID);
    }
}
