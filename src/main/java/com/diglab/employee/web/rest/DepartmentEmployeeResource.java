package com.diglab.employee.web.rest;

import com.diglab.employee.domain.DepartmentEmployee;
import com.diglab.employee.repository.DepartmentEmployeeRepository;
import com.diglab.employee.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.diglab.employee.domain.DepartmentEmployee}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DepartmentEmployeeResource {

    private final Logger log = LoggerFactory.getLogger(DepartmentEmployeeResource.class);

    private static final String ENTITY_NAME = "departmentEmployee";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DepartmentEmployeeRepository departmentEmployeeRepository;

    public DepartmentEmployeeResource(DepartmentEmployeeRepository departmentEmployeeRepository) {
        this.departmentEmployeeRepository = departmentEmployeeRepository;
    }

    /**
     * {@code POST  /department-employees} : Create a new departmentEmployee.
     *
     * @param departmentEmployee the departmentEmployee to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new departmentEmployee, or with status {@code 400 (Bad Request)} if the departmentEmployee has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/department-employees")
    public ResponseEntity<DepartmentEmployee> createDepartmentEmployee(@Valid @RequestBody DepartmentEmployee departmentEmployee) throws URISyntaxException {
        log.debug("REST request to save DepartmentEmployee : {}", departmentEmployee);
        if (departmentEmployee.getId() != null) {
            throw new BadRequestAlertException("A new departmentEmployee cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DepartmentEmployee result = departmentEmployeeRepository.save(departmentEmployee);
        return ResponseEntity.created(new URI("/api/department-employees/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /department-employees} : Updates an existing departmentEmployee.
     *
     * @param departmentEmployee the departmentEmployee to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated departmentEmployee,
     * or with status {@code 400 (Bad Request)} if the departmentEmployee is not valid,
     * or with status {@code 500 (Internal Server Error)} if the departmentEmployee couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/department-employees")
    public ResponseEntity<DepartmentEmployee> updateDepartmentEmployee(@Valid @RequestBody DepartmentEmployee departmentEmployee) throws URISyntaxException {
        log.debug("REST request to update DepartmentEmployee : {}", departmentEmployee);
        if (departmentEmployee.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DepartmentEmployee result = departmentEmployeeRepository.save(departmentEmployee);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, departmentEmployee.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /department-employees} : get all the departmentEmployees.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of departmentEmployees in body.
     */
    @GetMapping("/department-employees")
    public List<DepartmentEmployee> getAllDepartmentEmployees() {
        log.debug("REST request to get all DepartmentEmployees");
        return departmentEmployeeRepository.findAll();
    }

    /**
     * {@code GET  /department-employees/:id} : get the "id" departmentEmployee.
     *
     * @param id the id of the departmentEmployee to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the departmentEmployee, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/department-employees/{id}")
    public ResponseEntity<DepartmentEmployee> getDepartmentEmployee(@PathVariable Long id) {
        log.debug("REST request to get DepartmentEmployee : {}", id);
        Optional<DepartmentEmployee> departmentEmployee = departmentEmployeeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(departmentEmployee);
    }

    /**
     * {@code DELETE  /department-employees/:id} : delete the "id" departmentEmployee.
     *
     * @param id the id of the departmentEmployee to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/department-employees/{id}")
    public ResponseEntity<Void> deleteDepartmentEmployee(@PathVariable Long id) {
        log.debug("REST request to delete DepartmentEmployee : {}", id);
        departmentEmployeeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
