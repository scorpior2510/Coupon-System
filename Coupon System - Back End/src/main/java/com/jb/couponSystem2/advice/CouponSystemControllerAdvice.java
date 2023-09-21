package com.jb.couponSystem2.advice;

import com.jb.couponSystem2.exceptions.CouponException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CouponSystemControllerAdvice {
    @ExceptionHandler(CouponException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorDetails handleCouponSystemException (CouponException exception) {
        return new ErrorDetails(exception.getMessage());
    }
}
