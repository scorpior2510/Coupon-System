package com.jb.couponSystem2.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorMsg {
    ADD_COMPANY_ID_ALREADY_EXISTS("company id already exists"),
    ADD_COMPANY_NAME_ALREADY_EXISTS("company with the same name already exists"),
    ADD_COMPANY_EMAIL_ALREADY_EXISTS("company with the same email already exists"),
    UPDATE_COMPANY_DOES_NOT_EXIST("company id does not exist"),
    UPDATE_COMPANY_CHANGING_ID_IS_NOT_ALLOWED("update of company's id is not allowed"),
    UPDATE_COMPANY_CHANGING_NAME_IS_NOT_ALLOWED("update of company's name is not allowed"),
    DELETE_COMPANY_DOES_NOT_EXIST("company id does not exist"),
    ADD_CUSTOMER_ID_ALREADY_EXISTS("customer id already exists"),
    ADD_CUSTOMER_EMAIL_ALREADY_EXISTS("customer with the same email already exists"),
    UPDATE_CUSTOMER_DOES_NOT_EXIST("customer id does not exist"),
    UPDATE_CUSTOMER_CHANGING_ID_IS_NOT_ALLOWED("update of customer's id is not allowed"),
    DELETE_CUSTOMER_DOES_NOT_EXIST("customer id does not exist"),
    ADD_COUPON_TITLE_FOR_COMPANY_ALREADY_EXISTS("company already has a coupon with the same title"),
    ADD_COUPON_COMPANY_DOES_NOT_EXIST("company id does not exist"),
    UPDATE_COUPON_DOES_NOT_EXIST("coupon id does not exist"),
    UPDATE_COUPON_CHANGING_ID_IS_NOT_ALLOWED("update of coupon's id is not allowed"),
    UPDATE_COUPON_CHANGING_COMPANY_ID_IS_NOT_ALLOWED("Fill Cn Text"),
    UPDATE_COUPON_CHANGING_ANOTHER_COMPANY_COUPON_IS_NOT_ALLOWED("can't update coupon that belongs to another company"),
    UPDATE_COUPON_COMPANY_DOES_NOT_EXIST("company id does not exist"),
    DELETE_COUPON_DOES_NOT_EXIST("coupon id does not exist"),
    DELETE_COUPON_DELETING_ANOTHER_COMPANY_COUPON_IS_NOT_ALLOWED("deleting coupon of another company isn't allowed"),
    RETRIEVE_COUPONS_NO_COUPONS_FOR_THIS_COMPANY("company currently has no coupons in the db"),
    RETRIEVE_COUPONS_BY_CATEGORY_NO_COUPONS_FOR_THIS_COMPANY("company has no coupons under this category"),
    RETRIEVE_COUPONS_BY_MAX_PRICE_NO_COUPONS_FOR_THIS_COMPANY("company has no coupons under this price"),
    RETRIEVE_COUPONS_NO_COUPONS_IN_DB("no coupons exist in the db"),
    NO_SUCH_COMPANY_EXISTS("no such company exists"),
    PURCHASE_COUPON_LIMIT_OF_ONE_PER_CUSTOMER("can't purchase coupon because you already purchased it (limit of 1 per customer)"),
    PURCHASE_COUPON_RAN_OUT("can't purchase coupon because it ran out of stock"),
    PURCHASE_COUPON_EXPIRED("can't purchase coupon because it has expired"),
    PURCHASE_COUPON_DOES_NOT_EXIST("coupon does not exist"),
    RETRIEVE_COUPONS_NO_COUPONS_FOR_THIS_CUSTOMER("customer has no coupons"),
    RETRIEVE_COUPONS_IN_CATEGORY_NO_COUPONS_FOR_THIS_CUSTOMER("customer has no coupons under this category"),
    RETRIEVE_COUPONS_UNDER_PRICE_NO_COUPONS_FOR_THIS_CUSTOMER("customer has no coupons under this price"),
    NO_SUCH_CUSTOMER_EXISTS("customer does not exist"),
    LOGIN_WRONG_EMAIL_OR_PASSWORD("failed to login. wrong email or password"),
    NO_COMPANIES_MATCHING_REQUEST("db has no companies currently"),
    NO_COMPANY_MATCHING_REQUEST("company id does not exist"),
    NO_CUSTOMERS_MATCHING_REQUEST("db has no customers currently"),
    NO_CUSTOMER_MATCHING_REQUEST("customer id does not exist"),
    SECURITY_UNAUTHORIZED("you are not permitted for this action");

    private final String message;
}
