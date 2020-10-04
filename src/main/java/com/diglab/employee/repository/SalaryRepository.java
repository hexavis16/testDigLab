package com.diglab.employee.repository;

import com.diglab.employee.domain.Salary;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Salary entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SalaryRepository extends JpaRepository<Salary, Long> {
}
