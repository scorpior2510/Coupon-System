package com.jb.couponSystem2.jobs;

import com.jb.couponSystem2.repositories.CouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ClearExpiredCoupons {
    @Autowired
    private CouponRepository couponRepository;

    @Scheduled(fixedRate = 1000*60*60*24, initialDelay = 1000*60)
    public void clearExpiredCoupons() {
        couponRepository.deleteExpiredCouponsPurchases();
        couponRepository.deleteExpiredCoupons();
    }
}
