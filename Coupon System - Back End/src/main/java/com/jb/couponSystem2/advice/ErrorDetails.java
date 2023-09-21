package com.jb.couponSystem2.advice;

import lombok.Getter;

@Getter
public class ErrorDetails {
    private final String title = "CouponSystem Error";
    private final String description;
    public ErrorDetails(String description) {
        this.description = "Error Description: " + description;
    }
}
