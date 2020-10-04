package com.diglab.employee.repository;

import com.diglab.employee.domain.DepartmentEmployee;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the DepartmentEmployee entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DepartmentEmployeeRepository extends JpaRepository<DepartmentEmployee, Long> {
}
