package com.jb.couponSystem2.clr;

import com.jb.couponSystem2.beans.Category;
import com.jb.couponSystem2.beans.Company;
import com.jb.couponSystem2.beans.Coupon;
import com.jb.couponSystem2.exceptions.CouponException;
import com.jb.couponSystem2.repositories.CouponRepository;
import com.jb.couponSystem2.services.CompanyService;
import com.jb.couponSystem2.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.Arrays;

//@Component
@Order(110)
public class TestCompanyService implements CommandLineRunner {
    @Autowired
    private Utils utils;
    @Autowired
    private CompanyService companyService;
    @Autowired
    private CouponRepository couponRepository;

    public void testAddCoupon() {
        utils.testTitle("start", "CompanyService", "addCoupon");

        utils.testCase();
        System.out.println("Trying to add the following coupon for company 25 (title exists for this company)");
        Coupon coupon = Coupon.builder().category(Category.HOME_FURNITURE).title("20% Off STEM Toys").description("Get 15% off all lighting fixtures with any furniture purchase.").startDate(utils.generateRanStartDate()).endDate(utils.generateRanEndDate()).amount(30).price(140).image("https://www.komot.com/pub/media/photoarchive/get15offalllightingfixtureswithanyfurniturepurchase.jpg").build();
        System.out.println(coupon);
        try {
            companyService.addCoupon(25, coupon);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }

        utils.testCase();
        System.out.println("Trying to add the following coupon for company 25 (title exists for another company - should work)");
        coupon = Coupon.builder().category(Category.HOME_FURNITURE).title("Free Gift with Purchase").description("Get 15% off all lighting fixtures with any furniture purchase.").startDate(utils.generateRanStartDate()).endDate(utils.generateRanEndDate()).amount(30).price(140).image("https://www.komot.com/pub/media/photoarchive/get15offalllightingfixtureswithanyfurniturepurchase.jpg").build();
        System.out.println(coupon);
        try {
            companyService.addCoupon(25, coupon);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }
        System.out.println("Success");

        utils.testCase();
        System.out.println("Trying to add the following coupon for company 25");
        coupon = Coupon.builder().category(Category.HOME_FURNITURE).title("Lighting Fixtures").description("Get 15% off all lighting fixtures with any furniture purchase.").startDate(utils.generateRanStartDate()).endDate(utils.generateRanEndDate()).amount(30).price(140).image("https://www.komot.com/pub/media/photoarchive/get15offalllightingfixtureswithanyfurniturepurchase.jpg").build();
        System.out.println(coupon);
        try {
            companyService.addCoupon(25, coupon);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }
        System.out.println("Success");

        utils.testTitle("end", "CompanyService", "addCoupon");
    }
    public void testUpdateCoupon() {
        utils.testTitle("start", "CompanyService", "updateCoupon");

        utils.testCase();
        Coupon coupon = Coupon.builder().id(250).category(Category.BOOKS).title("Bestseller Sale").description("Get 25% off on all bestsellers. Limited time offer.").startDate(utils.generateRanStartDate()).endDate(utils.generateRanEndDate()).amount(80).price(40).image("https://www.tzometsfarim.com/pub/media/photoarchive/get25offonallbestsellerslimitedtimeoffer.gif").build();
        System.out.println("Trying to update a coupon with id of 250, for company 26:");
        try {
            companyService.updateCoupon(26, 250, coupon);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }

        utils.testCase();
        coupon = Coupon.builder().id(250).category(Category.BOOKS).title("Bestseller Sale").description("Get 25% off on all bestsellers. Limited time offer.").startDate(utils.generateRanStartDate()).endDate(utils.generateRanEndDate()).amount(80).price(40).image("https://www.tzometsfarim.com/pub/media/photoarchive/get25offonallbestsellerslimitedtimeoffer.gif").build();
        System.out.println("Trying to update a coupon with id of 102 to a coupons with id of 250, for company 26:");
        try {
            companyService.updateCoupon(26, 102, coupon);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }

        utils.testCase();
        coupon = Coupon.builder().id(102).category(Category.BOOKS).title("Bestseller Sale").description("Get 25% off on all bestsellers. Limited time offer.").startDate(utils.generateRanStartDate()).endDate(utils.generateRanEndDate()).amount(80).price(40).image("https://www.tzometsfarim.com/pub/media/photoarchive/get25offonallbestsellerslimitedtimeoffer.gif").build();
        System.out.println("Trying to update a coupon with id of 102, for company 26:");
        try {
            companyService.updateCoupon(26, 102, coupon);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }

        utils.testCase();
        coupon = Coupon.builder().id(89).category(Category.BOOKS).title("Bestseller Sale").description("Get 25% off on all bestsellers. Limited time offer.").startDate(utils.generateRanStartDate()).endDate(utils.generateRanEndDate()).amount(80).price(40).image("https://www.tzometsfarim.com/pub/media/photoarchive/get25offonallbestsellerslimitedtimeoffer.gif").build();
        System.out.println("Updating a coupon with id of 89, for company 26:");
        System.out.println(coupon);
        try {
            companyService.updateCoupon(26, 89, coupon);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }
        System.out.println("Success");

        utils.testTitle("end", "CompanyService", "updateCoupon");
    }
    public void testDeleteCoupon() {
        utils.testTitle("start", "CompanyService", "deleteCoupon");

        utils.testCase();
        System.out.println("Company 27 is Trying to delete coupon with id of 250:");
        try {
            companyService.deleteCoupon(27, 250);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }

        utils.testCase();
        System.out.println("Company 29 is Trying to delete coupon with id of 95:");
        try {
            companyService.deleteCoupon(29, 95);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }

        utils.testCase();
        System.out.println("Company 29 is Trying to delete coupon with id of 97:");
        try {
            companyService.deleteCoupon(29, 97);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }
        System.out.println("Success");

        utils.testTitle("end", "CompanyService", "deleteCoupon");
    }
    public void testGetCompanyCoupons() {
        utils.testTitle("start", "CompanyService", "getCompanyCoupons");

        System.out.println("Analyzing Company 30:");
        System.out.println();

        utils.testCase();
        System.out.println("All Company 30 Coupons:");
        try {
            companyService.getCompanyCoupons(30).forEach(System.out::println);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }

        utils.testCase();
        System.out.println("Company 30 Coupons By Categories:");
        Arrays.stream(Category.values()).toList().forEach(category -> {
            try {
                System.out.println("Category " + category + ": " + companyService.getCompanyCoupons(30, category));
            } catch (CouponException e) {
                System.out.println(e.getMessage());
            }
        });

        utils.testCase();
        System.out.println("Company 30 Coupons Under the price of 110");
        try {
            companyService.getCompanyCoupons(30, 110).forEach(System.out::println);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }
        System.out.println("\nCompany 30 Coupons Under the price of 130");
        try {
            companyService.getCompanyCoupons(30, 130).forEach(System.out::println);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }
        System.out.println("\nCompany 30 Coupons Under the price of 160");
        try {
            companyService.getCompanyCoupons(30, 160).forEach(System.out::println);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }

        utils.testTitle("end", "CompanyService", "getCompanyCoupons");
    }
    public void testGetCompanyDetails() {
        utils.testTitle("start", "CompanyService", "getCompanyDetails");

        utils.testCase();
        System.out.println("Fetching company 31 and presenting it:");
        Company company = null;
        try {
            company = companyService.getCompanyDetails(31);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }
        System.out.println(company);
        company.getCoupons().forEach(System.out::println);

        utils.testTitle("end", "CompanyService", "getCompanyDetails");
    }

    @Override
    public void run(String... args) throws Exception {
        testAddCoupon();
        testUpdateCoupon();
        testDeleteCoupon();
        testGetCompanyCoupons();
        testGetCompanyDetails();
    }
}
