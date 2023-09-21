package com.jb.couponSystem2.exceptions;

public class CouponException extends Exception {
    public CouponException(ErrorMsg errorMsg) {
        super(errorMsg.getMessage());
    }
}
