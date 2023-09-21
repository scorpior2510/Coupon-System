package com.jb.couponSystem2.controllers;

import com.jb.couponSystem2.beans.Category;
import com.jb.couponSystem2.beans.Company;
import com.jb.couponSystem2.beans.Coupon;
import com.jb.couponSystem2.exceptions.CouponException;
import com.jb.couponSystem2.exceptions.ErrorMsg;
import com.jb.couponSystem2.security.ClientType;
import com.jb.couponSystem2.security.TokenService;
import com.jb.couponSystem2.services.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/company")
public class CompanyController {
    @Autowired
    private TokenService tokenService;
    @Autowired
    private CompanyService companyService;

    @PostMapping(path = "/couponsOld")
    @ResponseStatus(HttpStatus.CREATED)
    public void addCoupon(@RequestHeader(value = "Authorization") UUID token, @RequestBody Coupon coupon) throws CouponException {
        if (!tokenService.authorized(ClientType.COMPANY, token)) {
            throw new CouponException(ErrorMsg.SECURITY_UNAUTHORIZED);
        }
        int companyID = tokenService.getIdByToken(token);
        companyService.addCoupon(companyID, coupon);
    }

    @PostMapping(path = "/coupons")
    @ResponseStatus(HttpStatus.CREATED)
    public Coupon addCouponV2(@RequestHeader(value = "Authorization") UUID token, @RequestBody Coupon coupon) throws CouponException {
        if (!tokenService.authorized(ClientType.COMPANY, token)) {
            throw new CouponException(ErrorMsg.SECURITY_UNAUTHORIZED);
        }
        int companyID = tokenService.getIdByToken(token);
        return companyService.addCouponV2(companyID, coupon);
    }

    @PutMapping(path = "/coupons/{couponID}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateCoupon(@RequestHeader(value = "Authorization") UUID token, @PathVariable int couponID, @RequestBody Coupon coupon) throws CouponException {
        if (!tokenService.authorized(ClientType.COMPANY, token)) {
            throw new CouponException(ErrorMsg.SECURITY_UNAUTHORIZED);
        }
        int companyID = tokenService.getIdByToken(token);
        companyService.updateCoupon(companyID, couponID, coupon);
    }

    @DeleteMapping(path = "/coupons/{couponID}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCoupon(@RequestHeader(value = "Authorization") UUID token, @PathVariable int couponID) throws CouponException {
        if (!tokenService.authorized(ClientType.COMPANY, token)) {
            throw new CouponException(ErrorMsg.SECURITY_UNAUTHORIZED);
        }
        int companyID = tokenService.getIdByToken(token);
        companyService.deleteCoupon(companyID, couponID);
    }

    @GetMapping(path = "/coupons")
    @ResponseStatus(HttpStatus.OK)
    public List<Coupon> getCompanyCoupons(@RequestHeader(value = "Authorization") UUID token) throws CouponException {
        if (!tokenService.authorized(ClientType.COMPANY, token)) {
            throw new CouponException(ErrorMsg.SECURITY_UNAUTHORIZED);
        }
        int companyID = tokenService.getIdByToken(token);
        return companyService.getCompanyCoupons(companyID);
    }

    @GetMapping(path = "/coupons", params = "category")
    @ResponseStatus(HttpStatus.OK)
    public List<Coupon> getCompanyCoupons(@RequestHeader(value = "Authorization") UUID token, @RequestParam(required = false) Category category) throws CouponException {
        if (!tokenService.authorized(ClientType.COMPANY, token)) {
            throw new CouponException(ErrorMsg.SECURITY_UNAUTHORIZED);
        }
        int companyID = tokenService.getIdByToken(token);
        return companyService.getCompanyCoupons(companyID, category);
    }

    @GetMapping(path = "/coupons", params = "maxPrice")
    @ResponseStatus(HttpStatus.OK)
    public List<Coupon> getCompanyCoupons(@RequestHeader(value = "Authorization") UUID token, @RequestParam(required = false) double maxPrice) throws CouponException {
        if (!tokenService.authorized(ClientType.COMPANY, token)) {
            throw new CouponException(ErrorMsg.SECURITY_UNAUTHORIZED);
        }
        int companyID = tokenService.getIdByToken(token);
        return companyService.getCompanyCoupons(companyID, maxPrice);
    }

    @GetMapping(path = "/details")
    @ResponseStatus(HttpStatus.OK)
    public Company getCompanyDetails(@RequestHeader(value = "Authorization") UUID token) throws CouponException {
        if (!tokenService.authorized(ClientType.COMPANY, token)) {
            throw new CouponException(ErrorMsg.SECURITY_UNAUTHORIZED);
        }
        int companyID = tokenService.getIdByToken(token);
        return companyService.getCompanyDetails(companyID);
    }

}
