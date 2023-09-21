package com.jb.couponSystem2.beans;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.*;

import java.sql.Date;
import java.util.*;
import java.util.stream.Collectors;

@Entity
@Table(name = "coupons")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Enumerated(EnumType.STRING)
    private Category category;
    @Column(nullable = false, length = 45)
    private String title;
    @Column(nullable = false, length = 100)
    private String description;
    @Column(nullable = false)
    private Date startDate;
    @Column(nullable = false)
    private Date endDate;
    @Column(nullable = false)
    private int amount;
    @Column(nullable = false)
    private double price;
    @Column(nullable = false, length = 200)
    private String image;

    @ManyToOne
    @ToString.Exclude
    @JsonIgnore
    @JoinColumn(name = "company_id")
    private Company company;

    @ManyToMany(mappedBy = "coupons")
    @ToString.Exclude
    @JsonIgnore
    private List<Customer> customers;

    public List<Customer> removeAllCustomers() {
        List<Customer> changedCustomers = this.customers.stream().toList();
        this.customers.forEach(customer -> customer.removeCoupon(this));
        this.customers.clear();
        return changedCustomers;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Coupon coupon = (Coupon) o;
        return id == coupon.id && amount == coupon.amount && Double.compare(coupon.price, price) == 0 && category == coupon.category && Objects.equals(title, coupon.title) && Objects.equals(description, coupon.description) && Objects.equals(startDate, coupon.startDate) && Objects.equals(endDate, coupon.endDate) && Objects.equals(image, coupon.image);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, category, title, description, startDate, endDate, amount, price, image);
    }
}
