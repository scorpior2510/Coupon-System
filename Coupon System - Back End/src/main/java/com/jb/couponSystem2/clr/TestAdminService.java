package com.jb.couponSystem2.clr;

import com.jb.couponSystem2.beans.Company;
import com.jb.couponSystem2.beans.Customer;
import com.jb.couponSystem2.exceptions.CouponException;
import com.jb.couponSystem2.services.AdminService;
import com.jb.couponSystem2.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

//@Component
@Order(100)
public class TestAdminService implements CommandLineRunner {
    @Autowired
    private Utils utils;
    @Autowired
    private AdminService adminService;

    public void testAddCompany() {
        utils.testTitle("start", "AdminService", "addCompany");

        utils.testCase();
        Company company = Company.builder().id(20).name("Green Industries").email("info@greenindustries.com").password("1234567").build();
        System.out.println("Trying to add the following company:");
        System.out.println(company);
        try {
            adminService.addCompany(company);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }

        utils.testCase();
        company = Company.builder().name("Castro").email("info@greenindustries.com").password("1234567").build();
        System.out.println("Trying to add the following company:");
        System.out.println(company);
        try {
            adminService.addCompany(company);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }

        utils.testCase();
        company = Company.builder().name("Green Industries").email("info@castro.co.il").password("1234567").build();
        System.out.println("Trying to add the following company:");
        System.out.println(company);
        try {
            adminService.addCompany(company);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }

        utils.testCase();
        company = Company.builder().name("Green Industries").email("info@greenindustries.com").password("1234567").build();
        System.out.println("Trying to add the following company:");
        System.out.println(company);
        try {
            adminService.addCompany(company);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }
        System.out.println("Added Successfully");

        utils.testTitle("end", "AdminService", "addCompany");
    }
    public void testUpdateCompany() {
        utils.testTitle("start", "AdminService", "updateCompany");

        utils.testCase();
        Company company = Company.builder().id(205).name("Purple Ventures").email("info@purpleventures.com").password("1234567").build();
        System.out.println("Trying to update a company with id of 21 to the following company:");
        System.out.println(company);
        try {
            adminService.updateCompany(21, company);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }

        utils.testCase();
        company = Company.builder().id(21).name("Purple Ventures").email("info@purpleventures.com").password("1234567").build();
        System.out.println("Trying to update a company with id of 21 to the following company:");
        System.out.println(company);
        try {
            adminService.updateCompany(21, company);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }
        System.out.println("This is the existing company from the db:");
        try {
            System.out.println(adminService.getSingleCompany(21));
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }

        utils.testCase();
        company = Company.builder().id(21).name("Halamit").email("info@purpleventures.com").password("1234567").build();
        System.out.println("Trying to update a company with id of 21 to the following company:");
        System.out.println(company);
        try {
            adminService.updateCompany(21, company);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }
        System.out.println("Success");

        utils.testTitle("end", "AdminService", "updateCompany");
    }
    public void testDeleteCompany() {
        utils.testTitle("start", "AdminService", "deleteCompany");

        utils.testCase();
        System.out.println("Trying to delete a company with id of 250");
        try {
            adminService.deleteCompany(250);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }

        utils.testCase();
        System.out.println("Trying to delete a company with id of 21");
        try {
            adminService.deleteCompany(21);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }
        System.out.println("success");

        utils.testTitle("end", "AdminService", "deleteCompany");
    }
    public void testGetAllCompanies() {
        utils.testTitle("start", "AdminService", "getAllCompanies");

        utils.testCase();
        System.out.println("Fetching all companies from the db:");
        try {
            adminService.getAllCompanies().forEach(System.out::println);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }

        utils.testTitle("end", "AdminService", "getAllCompanies");
    }
    public void testGetSingleCompany() {
        utils.testTitle("start", "AdminService", "getSingleCompany");

        utils.testCase();
        System.out.println("Trying to fetch a company with id 250");
        try {
            adminService.getSingleCompany(250);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }

        utils.testCase();
        System.out.println("Trying to fetch a company with id 22");
        try {
            System.out.println(adminService.getSingleCompany(22));
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }
        System.out.println("Success");

        utils.testTitle("end", "AdminService", "getSingleCompany");
    }
    public void testAddCustomer() {
        utils.testTitle("start", "AdminService", "addCustomer");

        utils.testCase();
        Customer customer = Customer.builder().id(20).firstName("Celeste").lastName("Perron").email("celesteperron123@gmail.com").password("123456").build();
        System.out.println("Trying to add the following customer:");
        System.out.println(customer);
        try {
            adminService.addCustomer(customer);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }

        utils.testCase();
        customer = Customer.builder().firstName("Celeste").lastName("Perron").email("shlomogreenberg1953@gmail.com").password("123456").build();
        System.out.println("Trying to add the following customer:");
        System.out.println(customer);
        try {
            adminService.addCustomer(customer);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }

        utils.testCase();
        customer = Customer.builder().firstName("Celeste").lastName("Perron").email("celesteperron123@gmail.com").password("123456").build();
        System.out.println("Trying to add the following customer:");
        System.out.println(customer);
        try {
            adminService.addCustomer(customer);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }
        System.out.println("Success");

        utils.testTitle("end", "AdminService", "addCustomer");
    }
    public void testUpdateCustomer() {
        utils.testTitle("start", "AdminService", "updateCustomer");

        utils.testCase();
        Customer customer = Customer.builder().id(207).firstName("Hugo").lastName("Mercier").email("hugomercier123@gmail.com").password("123456").build();
        System.out.println("Trying to update customer 250 to the following customer:");
        try {
            adminService.updateCustomer(250, customer);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }

        utils.testCase();
        customer = Customer.builder().id(210).firstName("Hugo").lastName("Mercier").email("hugomercier123@gmail.com").password("123456").build();
        System.out.println("Trying to update customer 21 to the following customer:");
        System.out.println(customer);
        try {
            adminService.updateCustomer(21, customer);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }

        utils.testCase();
        customer = Customer.builder().id(21).firstName("Hugo").lastName("Mercier").email("hugomercier123@gmail.com").password("123456").build();
        System.out.println("Trying to update customer 21 to the following customer:");
        System.out.println(customer);
        try {
            adminService.updateCustomer(21, customer);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }
        System.out.println("Success");

        utils.testTitle("end", "AdminService", "updateCustomer");
    }
    public void testDeleteCustomer() {
        utils.testTitle("start", "AdminService", "deleteCustomer");

        utils.testCase();
        System.out.println("Trying to delete customer with id 250");
        try {
            adminService.deleteCustomer(250);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }

        utils.testCase();
        System.out.println("Trying to delete customer with id 22");
        try {
            adminService.deleteCustomer(22);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }
        System.out.println("Success");

        utils.testTitle("end", "AdminService", "deleteCustomer");
    }
    public void testGetAllCustomers() {
        utils.testTitle("start", "AdminService", "getAllCustomers");

        utils.testCase();
        System.out.println("Fetching All Customers from db:");
        try {
            adminService.getAllCustomers().forEach(System.out::println);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }

        utils.testTitle("end", "AdminService", "getAllCustomers");
    }
    public void testGetSingleCustomer() {
        utils.testTitle("start", "AdminService", "getSingleCustomer");

        utils.testCase();
        System.out.println("Trying to fetch customer 250");
        try {
            adminService.getSingleCustomer(250);
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }

        utils.testCase();
        System.out.println("Fetching Customer 23 from db:");
        try {
            System.out.println(adminService.getSingleCustomer(23));
        } catch (CouponException e) {
            System.out.println(e.getMessage());
        }
        System.out.println("Success");

        utils.testTitle("end", "AdminService", "getSingleCustomer");
    }

    @Override
    public void run(String... args) throws Exception {
        testAddCompany();
        testUpdateCompany();
        testDeleteCompany();
        testGetAllCompanies();
        testGetSingleCompany();
        testAddCustomer();
        testUpdateCustomer();
        testDeleteCustomer();
        testGetAllCustomers();
        testGetSingleCustomer();
    }
}
