package com.jb.couponSystem2.utils;

import org.springframework.stereotype.Component;

import java.sql.Date;
import java.time.LocalDate;

@Component
public class Utils {
    private int methodCount = 1;
    private int methodCaseCount = 1;
    public Date generateRanStartDate() {
        LocalDate now = LocalDate.now();
        LocalDate ranStartDate = now.plusDays((int) (Math.random() * 11));
        return Date.valueOf(ranStartDate);
    }
    public Date generateRanEndDate() {
        LocalDate now = LocalDate.now();
        LocalDate ranEndDate = now.plusDays((int) (Math.random() * 35) + 16);
        return Date.valueOf(ranEndDate);
    }
    public Date getRandPastStartDate() {
        LocalDate now = LocalDate.now();
        LocalDate ranStartDate = now.minusDays((int) (Math.random() * 11) + 10);
        return Date.valueOf(ranStartDate);
    }
    public Date getRandPastEndDate() {
        LocalDate now = LocalDate.now();
        LocalDate ranEndDate = now.minusDays((int) (Math.random() * 9) + 1);
        return Date.valueOf(ranEndDate);
    }
    public void testTitle(String startEnd, String classTested, String methodTested) {
        if (startEnd.equalsIgnoreCase("start")) {
            System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Test " + methodCount + " Start: " + classTested + ", " + methodTested);
            System.out.println();
            return;
        }
        if (startEnd.equalsIgnoreCase("end")) {
            methodCaseCount = 1;
            System.out.println();
            System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Test " + methodCount++ + " End: " + classTested + ", " + methodTested);
            System.out.println();
        }
    }
    public void testCase() {
        if (methodCaseCount !=1) {
            System.out.println();
        }
        System.out.println("Case " + methodCaseCount++);
    }
}
