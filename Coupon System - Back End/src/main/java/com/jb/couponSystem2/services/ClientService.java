package com.jb.couponSystem2.services;

import com.jb.couponSystem2.repositories.CompanyRepository;
import com.jb.couponSystem2.repositories.CouponRepository;
import com.jb.couponSystem2.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class ClientService {
    @Autowired
    protected CustomerRepository customerRepository;
    @Autowired
    protected CompanyRepository companyRepository;
    @Autowired
    protected CouponRepository couponRepository;
}
