package com.jb.couponSystem2.security;

import com.jb.couponSystem2.exceptions.CouponException;
import com.jb.couponSystem2.security.UserLoginDetails;

import java.util.UUID;

public interface LoginService {
    UUID login(UserLoginDetails loginDetails) throws CouponException;
}
