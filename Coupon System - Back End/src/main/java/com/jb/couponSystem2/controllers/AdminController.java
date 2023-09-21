package com.jb.couponSystem2.controllers;

import com.jb.couponSystem2.beans.Company;
import com.jb.couponSystem2.beans.Customer;
import com.jb.couponSystem2.exceptions.CouponException;
import com.jb.couponSystem2.exceptions.ErrorMsg;
import com.jb.couponSystem2.security.ClientType;
import com.jb.couponSystem2.security.TokenService;
import com.jb.couponSystem2.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping(path = "api/admin")
public class AdminController {
    @Autowired
    private TokenService tokenService;
    @Autowired
    private AdminService adminService;

    @PostMapping(path = "/companies")
    @ResponseStatus(value = HttpStatus.CREATED)
    public Company addCompany(@RequestHeader(value = "Authorization") UUID token, @RequestBody Company company) throws CouponException {
        if (!tokenService.authorized(ClientType.ADMINISTRATOR, token)) {
            throw new CouponException(ErrorMsg.SECURITY_UNAUTHORIZED);
        }
        return adminService.addCompany(company);
    }

    @PutMapping(path = "/companies/{companyID}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void updateCompany(@RequestHeader(value = "Authorization") UUID token, @PathVariable int companyID, @RequestBody Company company) throws CouponException {
        if (!tokenService.authorized(ClientType.ADMINISTRATOR, token)) {
            throw new CouponException(ErrorMsg.SECURITY_UNAUTHORIZED);
        }
        adminService.updateCompany(companyID, company);
    }

    @DeleteMapping(path = "/companies/{companyID}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteCompany(@RequestHeader(value = "Authorization") UUID token, @PathVariable int companyID) throws CouponException {
        if (!tokenService.authorized(ClientType.ADMINISTRATOR, token)) {
            throw new CouponException(ErrorMsg.SECURITY_UNAUTHORIZED);
        }
        adminService.deleteCompany(companyID);
    }

    @GetMapping(path = "/companies")
    @ResponseStatus(HttpStatus.OK)
    public List<Company> getAllCompanies(@RequestHeader(value = "Authorization") UUID token) throws CouponException {
        if (!tokenService.authorized(ClientType.ADMINISTRATOR, token)) {
            throw new CouponException(ErrorMsg.SECURITY_UNAUTHORIZED);
        }
        return adminService.getAllCompanies();
    }

    @GetMapping(path = "/companies/{companyID}")
    @ResponseStatus(HttpStatus.OK)
    public Company getSingleCompany(@RequestHeader(value = "Authorization") UUID token, @PathVariable int companyID) throws CouponException {
        if (!tokenService.authorized(ClientType.ADMINISTRATOR, token)) {
            throw new CouponException(ErrorMsg.SECURITY_UNAUTHORIZED);
        }
        return adminService.getSingleCompany(companyID);
    }

    @PostMapping(path = "/customers")
    @ResponseStatus(value = HttpStatus.CREATED)
    public Customer addCustomer(@RequestHeader(value = "Authorization") UUID token, @RequestBody Customer customer) throws CouponException {
        if (!tokenService.authorized(ClientType.ADMINISTRATOR, token)) {
            throw new CouponException(ErrorMsg.SECURITY_UNAUTHORIZED);
        }
        return adminService.addCustomer(customer);
    }

    @PutMapping(path = "/customers/{customerID}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void updateCustomer(@RequestHeader(value = "Authorization") UUID token, @PathVariable int customerID, @RequestBody Customer customer) throws CouponException {
        if (!tokenService.authorized(ClientType.ADMINISTRATOR, token)) {
            throw new CouponException(ErrorMsg.SECURITY_UNAUTHORIZED);
        }
        adminService.updateCustomer(customerID, customer);
    }

    @DeleteMapping(path = "/customers/{customerID}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteCustomer(@RequestHeader(value = "Authorization") UUID token, @PathVariable int customerID) throws CouponException {
        if (!tokenService.authorized(ClientType.ADMINISTRATOR, token)) {
            throw new CouponException(ErrorMsg.SECURITY_UNAUTHORIZED);
        }
        adminService.deleteCustomer(customerID);
    }

    @GetMapping(path = "/customers")
    @ResponseStatus(HttpStatus.OK)
    public List<Customer> getAllCustomers(@RequestHeader(value = "Authorization") UUID token) throws CouponException {
        if (!tokenService.authorized(ClientType.ADMINISTRATOR, token)) {
            throw new CouponException(ErrorMsg.SECURITY_UNAUTHORIZED);
        }
        return adminService.getAllCustomers();
    }

    @GetMapping(path = "/customers/{customerID}")
    @ResponseStatus(HttpStatus.OK)
    public Customer getSingleCustomer(@RequestHeader(value = "Authorization") UUID token, @PathVariable int customerID) throws CouponException {
        if (!tokenService.authorized(ClientType.ADMINISTRATOR, token)) {
            throw new CouponException(ErrorMsg.SECURITY_UNAUTHORIZED);
        }
        return adminService.getSingleCustomer(customerID);
    }

}
