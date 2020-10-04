package com.diglab.employee.web.rest;

import com.diglab.employee.domain.DepartmentManager;
import com.diglab.employee.repository.DepartmentManagerRepository;
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
 * REST controller for managing {@link com.diglab.employee.domain.DepartmentManager}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DepartmentManagerResource {

    private final Logger log = LoggerFactory.getLogger(DepartmentManagerResource.class);

    private static final String ENTITY_NAME = "departmentManager";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DepartmentManagerRepository departmentManagerRepository;

    public DepartmentManagerResource(DepartmentManagerRepository departmentManagerRepository) {
        this.departmentManagerRepository = departmentManagerRepository;
    }

    /**
     * {@code POST  /department-managers} : Create a new departmentManager.
     *
     * @param departmentManager the departmentManager to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new departmentManager, or with status {@code 400 (Bad Request)} if the departmentManager has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/department-managers")
    public ResponseEntity<DepartmentManager> createDepartmentManager(@Valid @RequestBody DepartmentManager departmentManager) throws URISyntaxException {
        log.debug("REST request to save DepartmentManager : {}", departmentManager);
        if (departmentManager.getId() != null) {
            throw new BadRequestAlertException("A new departmentManager cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DepartmentManager result = departmentManagerRepository.save(departmentManager);
        return ResponseEntity.created(new URI("/api/department-managers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /department-managers} : Updates an existing departmentManager.
     *
     * @param departmentManager the departmentManager to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated departmentManager,
     * or with status {@code 400 (Bad Request)} if the departmentManager is not valid,
     * or with status {@code 500 (Internal Server Error)} if the departmentManager couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/department-managers")
    public ResponseEntity<DepartmentManager> updateDepartmentManager(@Valid @RequestBody DepartmentManager departmentManager) throws URISyntaxException {
        log.debug("REST request to update DepartmentManager : {}", departmentManager);
        if (departmentManager.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DepartmentManager result = departmentManagerRepository.save(departmentManager);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, departmentManager.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /department-managers} : get all the departmentManagers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of departmentManagers in body.
     */
    @GetMapping("/department-managers")
    public List<DepartmentManager> getAllDepartmentManagers() {
        log.debug("REST request to get all DepartmentManagers");
        return departmentManagerRepository.findAll();
    }

    /**
     * {@code GET  /department-managers/:id} : get the "id" departmentManager.
     *
     * @param id the id of the departmentManager to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the departmentManager, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/department-managers/{id}")
    public ResponseEntity<DepartmentManager> getDepartmentManager(@PathVariable Long id) {
        log.debug("REST request to get DepartmentManager : {}", id);
        Optional<DepartmentManager> departmentManager = departmentManagerRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(departmentManager);
    }

    /**
     * {@code DELETE  /department-managers/:id} : delete the "id" departmentManager.
     *
     * @param id the id of the departmentManager to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/department-managers/{id}")
    public ResponseEntity<Void> deleteDepartmentManager(@PathVariable Long id) {
        log.debug("REST request to delete DepartmentManager : {}", id);
        departmentManagerRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
