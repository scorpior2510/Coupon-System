package com.jb.couponSystem2.repositories;

import com.jb.couponSystem2.beans.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer> {
    boolean existsByName(String name);
    boolean existsByEmail(String email);
    Company findByEmailAndPassword(String email, String password);
}
