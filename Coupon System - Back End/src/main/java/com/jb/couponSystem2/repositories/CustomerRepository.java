package com.jb.couponSystem2.repositories;

import com.jb.couponSystem2.beans.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    boolean existsByEmail(String email);
    Customer findByEmailAndPassword(String email, String password);

}
