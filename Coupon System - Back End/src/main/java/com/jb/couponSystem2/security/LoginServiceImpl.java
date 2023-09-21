package com.jb.couponSystem2.security;

import com.jb.couponSystem2.beans.Company;
import com.jb.couponSystem2.beans.Customer;
import com.jb.couponSystem2.exceptions.CouponException;
import com.jb.couponSystem2.exceptions.ErrorMsg;
import com.jb.couponSystem2.repositories.CompanyRepository;
import com.jb.couponSystem2.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private TokenService tokenService;
    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public UUID login(UserLoginDetails loginDetails) throws CouponException {
        String email = loginDetails.getEmail();
        String password = loginDetails.getPassword();
        ClientType clientType = loginDetails.getClientType();
        switch (clientType) {
            case ADMINISTRATOR:
                if (email.equals("admin@admin.com") && password.equals("admin")) {
                    return tokenService.addToken(0, clientType);
                }
                break;
            case COMPANY:
                Company company = companyRepository.findByEmailAndPassword(email, password);
                if (company != null) {
                    return tokenService.addToken(company.getId(), clientType);
                }
                break;
            case CUSTOMER:
                Customer customer = customerRepository.findByEmailAndPassword(email, password);
                if (customer != null) {
                    return tokenService.addToken(customer.getId(), clientType);
                }
                break;
        }
        throw new CouponException(ErrorMsg.LOGIN_WRONG_EMAIL_OR_PASSWORD);
    }
}
