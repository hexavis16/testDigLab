package com.diglab.employee.repository;

import com.diglab.employee.domain.DepartmentManager;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the DepartmentManager entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DepartmentManagerRepository extends JpaRepository<DepartmentManager, Long> {
}
