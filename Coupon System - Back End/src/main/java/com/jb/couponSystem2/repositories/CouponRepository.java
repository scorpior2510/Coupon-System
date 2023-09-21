package com.jb.couponSystem2.repositories;

import com.jb.couponSystem2.beans.Category;
import com.jb.couponSystem2.beans.Coupon;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;
import java.util.Set;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Integer> {
    List<Coupon> findByCompanyId(int companyID);
    List<Coupon> findByCategoryAndCompanyId(Category category, int companyID);
    List<Coupon> findByCompanyIdAndPriceLessThan(int companyID, double price);
    List<Coupon> findByCustomersId(int customerID);
    Coupon findByTitleAndCompanyId(String title, int companyID);
    boolean existsByTitleAndCompanyId(String title, int companyID);
    boolean existsByIdAndCustomersId(int couponID, int customerID);
    List<Coupon> findByCategoryAndCustomersId(Category category, int customerID);
    List<Coupon> findByCustomersIdAndPriceLessThan(int customerID, double maxPrice);
    List<Coupon> findByEndDateBefore(Date date);
    @Transactional
    @Modifying
    @Query(value = "DELETE \n" +
                    "FROM couponsystem2.customers_vs_coupons \n" +
                    "WHERE customers_vs_coupons.coupon_id IN \n" +
                    "(\n" +
                    "\tSELECT id \n" +
                    "\tFROM couponsystem2.coupons\n" +
                    "\tWHERE end_date < current_date()\n" +
                    ");",
            nativeQuery = true)
    void deleteExpiredCouponsPurchases();

    @Transactional
    @Modifying
    @Query(value =
            "DELETE \n" +
            "FROM couponsystem2.coupons \n" +
            "WHERE end_date < current_date();",
            nativeQuery = true)
    void deleteExpiredCoupons();
}
