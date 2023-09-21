package com.jb.couponSystem2.security;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserLoginDetails {
    private String email;
    private String password;
    private ClientType clientType;
}
