package com.jb.couponSystem2.controllers;

import com.jb.couponSystem2.exceptions.CouponException;
import com.jb.couponSystem2.security.ClientType;
import com.jb.couponSystem2.security.LoginService;
import com.jb.couponSystem2.security.UserLoginDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("api/auth")
public class AuthController {

    @Autowired
    private LoginService loginService;

    @PostMapping(path = "/login")
    @ResponseStatus(HttpStatus.CREATED)
    public UUID login(@RequestBody UserLoginDetails loginDetails) throws CouponException {
        return loginService.login(loginDetails);
    }
}
