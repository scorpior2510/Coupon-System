package com.jb.couponSystem2.jobs;

import com.jb.couponSystem2.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ClearExpiredTokens {
    @Autowired
    private TokenService tokenService;

    @Scheduled(fixedDelay = 1000*60)
    public void clearExpiredTokens() {
        this.tokenService.clearExpiredTokens();
    }

}
