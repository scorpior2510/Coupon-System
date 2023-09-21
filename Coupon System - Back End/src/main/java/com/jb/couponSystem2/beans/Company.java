package com.jb.couponSystem2.beans;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "companies")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false, length = 45)
    private String name;
    @Column(nullable = false, length = 45)
    private String email;
    @Column(nullable = false, length = 45)
    private String password;
    @OneToMany(mappedBy = "company", cascade = {CascadeType.REMOVE, CascadeType.PERSIST, CascadeType.MERGE})
    private List<Coupon> coupons;

    public void setCoupons(List<Coupon> coupons) {
        if (coupons != null) {
            coupons.forEach(coupon -> coupon.setCompany(this));
        }
        this.coupons = coupons;
    }

    public Company addCoupon(Coupon coupon) {
        if (this.coupons == null) {
            this.coupons = new ArrayList<>();
        }
        coupon.setCompany(this);
        this.coupons.add(coupon);
        return this;
    }
}
