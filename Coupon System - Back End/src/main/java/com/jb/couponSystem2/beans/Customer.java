package com.jb.couponSystem2.beans;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;

@Entity
@Table(name = "customers")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false, length = 45)
    private String firstName;
    @Column(nullable = false, length = 45)
    private String lastName;
    @Column(nullable = false, length = 45)
    private String email;
    @Column(nullable = false, length = 45)
    private String password;
    @ManyToMany
    @JoinTable(
            name = "customers_vs_coupons",
            joinColumns = {@JoinColumn(name = "customer_id")},
            inverseJoinColumns = {@JoinColumn(name = "coupon_id")})
    private List<Coupon> coupons;

    public Customer addCoupon(Coupon coupon) {
        if (this.coupons == null) {
            this.coupons = new ArrayList<>();
        }
        coupon.getCustomers().add(this);
        this.coupons.add(coupon);
        return this;
    }

    public void removeCoupon(Coupon coupon) {
        this.coupons.remove(coupon);
    }

    public void removeAllCoupons() {
        this.coupons.clear();
    }
}
