package com.jb.couponSystem2.clr;

import com.jb.couponSystem2.security.ClientType;
import com.jb.couponSystem2.security.LoginService;
import com.jb.couponSystem2.security.UserLoginDetails;
import com.jb.couponSystem2.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.UUID;

//@Component
@Order(200)
public class TestLoginService implements CommandLineRunner {

    @Autowired
    private Utils utils;
    @Autowired
    private LoginService loginService;

    @Override
    public void run(String... args) throws Exception {
        utils.testTitle("start", "LoginService", "login");

        UserLoginDetails adminSuccess = new UserLoginDetails("admin@admin.com", "admin", ClientType.ADMINISTRATOR);
        UserLoginDetails adminFail = new UserLoginDetails("admin@admin.com", "1234", ClientType.ADMINISTRATOR);
        UserLoginDetails customerSuccess = new UserLoginDetails("yotamavraham119@outlook.com", "123456", ClientType.CUSTOMER);
        UserLoginDetails customerFail = new UserLoginDetails("yotamavraham119@outlook.com", "12345689", ClientType.CUSTOMER);
        UserLoginDetails companySuccess = new UserLoginDetails("info@castro.co.il", "1234567", ClientType.COMPANY);
        UserLoginDetails companyFail = new UserLoginDetails("info@castro.co.il", "1234566", ClientType.COMPANY);

        utils.testCase();
        UUID token = null;
        System.out.println("User tries to login with the following details: ");
        System.out.println(adminSuccess);
        try {
            token = loginService.login(adminSuccess);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        if (token != null) {
            System.out.println("Success: Token is: " + token);
        }

        utils.testCase();
        token = null;
        System.out.println("User tries to login with the following details: ");
        System.out.println(adminFail);
        try {
            token = loginService.login(adminFail);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        if (token != null) {
            System.out.println("Success: Token is: " + token);
        }

        utils.testCase();
        token = null;
        System.out.println("User tries to login with the following details: ");
        System.out.println(customerSuccess);
        try {
            token = loginService.login(customerSuccess);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        if (token != null) {
            System.out.println("Success: Token is: " + token);
        }

        utils.testCase();
        token = null;
        System.out.println("User tries to login with the following details: ");
        System.out.println(customerFail);
        try {
            token = loginService.login(customerFail);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        if (token != null) {
            System.out.println("Success: Token is: " + token);
        }

        utils.testCase();
        token = null;
        System.out.println("User tries to login with the following details: ");
        System.out.println(companySuccess);
        try {
            token = loginService.login(companySuccess);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        if (token != null) {
            System.out.println("Success: Token is: " + token);
        }

        utils.testCase();
        token = null;
        System.out.println("User tries to login with the following details: ");
        System.out.println(companyFail);
        try {
            token = loginService.login(companyFail);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        if (token != null) {
            System.out.println("Success: Token is: " + token);
        }



        utils.testTitle("end", "LoginService", "login");
    }
}
