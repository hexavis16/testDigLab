package com.diglab.employee.web.rest;

import com.diglab.employee.TestDigLabApp;
import com.diglab.employee.domain.DepartmentManager;
import com.diglab.employee.domain.Employee;
import com.diglab.employee.domain.Department;
import com.diglab.employee.repository.DepartmentManagerRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.diglab.employee.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link DepartmentManagerResource} REST controller.
 */
@SpringBootTest(classes = TestDigLabApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class DepartmentManagerResourceIT {

    private static final ZonedDateTime DEFAULT_FROM_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FROM_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_TO_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_TO_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private DepartmentManagerRepository departmentManagerRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDepartmentManagerMockMvc;

    private DepartmentManager departmentManager;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DepartmentManager createEntity(EntityManager em) {
        DepartmentManager departmentManager = new DepartmentManager()
            .fromDate(DEFAULT_FROM_DATE)
            .toDate(DEFAULT_TO_DATE);
        // Add required entity
        Employee employee;
        if (TestUtil.findAll(em, Employee.class).isEmpty()) {
            employee = EmployeeResourceIT.createEntity(em);
            em.persist(employee);
            em.flush();
        } else {
            employee = TestUtil.findAll(em, Employee.class).get(0);
        }
        departmentManager.setEmployee(employee);
        // Add required entity
        Department department;
        if (TestUtil.findAll(em, Department.class).isEmpty()) {
            department = DepartmentResourceIT.createEntity(em);
            em.persist(department);
            em.flush();
        } else {
            department = TestUtil.findAll(em, Department.class).get(0);
        }
        departmentManager.setDepartment(department);
        return departmentManager;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DepartmentManager createUpdatedEntity(EntityManager em) {
        DepartmentManager departmentManager = new DepartmentManager()
            .fromDate(UPDATED_FROM_DATE)
            .toDate(UPDATED_TO_DATE);
        // Add required entity
        Employee employee;
        if (TestUtil.findAll(em, Employee.class).isEmpty()) {
            employee = EmployeeResourceIT.createUpdatedEntity(em);
            em.persist(employee);
            em.flush();
        } else {
            employee = TestUtil.findAll(em, Employee.class).get(0);
        }
        departmentManager.setEmployee(employee);
        // Add required entity
        Department department;
        if (TestUtil.findAll(em, Department.class).isEmpty()) {
            department = DepartmentResourceIT.createUpdatedEntity(em);
            em.persist(department);
            em.flush();
        } else {
            department = TestUtil.findAll(em, Department.class).get(0);
        }
        departmentManager.setDepartment(department);
        return departmentManager;
    }

    @BeforeEach
    public void initTest() {
        departmentManager = createEntity(em);
    }

    @Test
    @Transactional
    public void createDepartmentManager() throws Exception {
        int databaseSizeBeforeCreate = departmentManagerRepository.findAll().size();
        // Create the DepartmentManager
        restDepartmentManagerMockMvc.perform(post("/api/department-managers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(departmentManager)))
            .andExpect(status().isCreated());

        // Validate the DepartmentManager in the database
        List<DepartmentManager> departmentManagerList = departmentManagerRepository.findAll();
        assertThat(departmentManagerList).hasSize(databaseSizeBeforeCreate + 1);
        DepartmentManager testDepartmentManager = departmentManagerList.get(departmentManagerList.size() - 1);
        assertThat(testDepartmentManager.getFromDate()).isEqualTo(DEFAULT_FROM_DATE);
        assertThat(testDepartmentManager.getToDate()).isEqualTo(DEFAULT_TO_DATE);
    }

    @Test
    @Transactional
    public void createDepartmentManagerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = departmentManagerRepository.findAll().size();

        // Create the DepartmentManager with an existing ID
        departmentManager.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDepartmentManagerMockMvc.perform(post("/api/department-managers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(departmentManager)))
            .andExpect(status().isBadRequest());

        // Validate the DepartmentManager in the database
        List<DepartmentManager> departmentManagerList = departmentManagerRepository.findAll();
        assertThat(departmentManagerList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkFromDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = departmentManagerRepository.findAll().size();
        // set the field null
        departmentManager.setFromDate(null);

        // Create the DepartmentManager, which fails.


        restDepartmentManagerMockMvc.perform(post("/api/department-managers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(departmentManager)))
            .andExpect(status().isBadRequest());

        List<DepartmentManager> departmentManagerList = departmentManagerRepository.findAll();
        assertThat(departmentManagerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDepartmentManagers() throws Exception {
        // Initialize the database
        departmentManagerRepository.saveAndFlush(departmentManager);

        // Get all the departmentManagerList
        restDepartmentManagerMockMvc.perform(get("/api/department-managers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(departmentManager.getId().intValue())))
            .andExpect(jsonPath("$.[*].fromDate").value(hasItem(sameInstant(DEFAULT_FROM_DATE))))
            .andExpect(jsonPath("$.[*].toDate").value(hasItem(sameInstant(DEFAULT_TO_DATE))));
    }
    
    @Test
    @Transactional
    public void getDepartmentManager() throws Exception {
        // Initialize the database
        departmentManagerRepository.saveAndFlush(departmentManager);

        // Get the departmentManager
        restDepartmentManagerMockMvc.perform(get("/api/department-managers/{id}", departmentManager.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(departmentManager.getId().intValue()))
            .andExpect(jsonPath("$.fromDate").value(sameInstant(DEFAULT_FROM_DATE)))
            .andExpect(jsonPath("$.toDate").value(sameInstant(DEFAULT_TO_DATE)));
    }
    @Test
    @Transactional
    public void getNonExistingDepartmentManager() throws Exception {
        // Get the departmentManager
        restDepartmentManagerMockMvc.perform(get("/api/department-managers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDepartmentManager() throws Exception {
        // Initialize the database
        departmentManagerRepository.saveAndFlush(departmentManager);

        int databaseSizeBeforeUpdate = departmentManagerRepository.findAll().size();

        // Update the departmentManager
        DepartmentManager updatedDepartmentManager = departmentManagerRepository.findById(departmentManager.getId()).get();
        // Disconnect from session so that the updates on updatedDepartmentManager are not directly saved in db
        em.detach(updatedDepartmentManager);
        updatedDepartmentManager
            .fromDate(UPDATED_FROM_DATE)
            .toDate(UPDATED_TO_DATE);

        restDepartmentManagerMockMvc.perform(put("/api/department-managers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDepartmentManager)))
            .andExpect(status().isOk());

        // Validate the DepartmentManager in the database
        List<DepartmentManager> departmentManagerList = departmentManagerRepository.findAll();
        assertThat(departmentManagerList).hasSize(databaseSizeBeforeUpdate);
        DepartmentManager testDepartmentManager = departmentManagerList.get(departmentManagerList.size() - 1);
        assertThat(testDepartmentManager.getFromDate()).isEqualTo(UPDATED_FROM_DATE);
        assertThat(testDepartmentManager.getToDate()).isEqualTo(UPDATED_TO_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingDepartmentManager() throws Exception {
        int databaseSizeBeforeUpdate = departmentManagerRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDepartmentManagerMockMvc.perform(put("/api/department-managers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(departmentManager)))
            .andExpect(status().isBadRequest());

        // Validate the DepartmentManager in the database
        List<DepartmentManager> departmentManagerList = departmentManagerRepository.findAll();
        assertThat(departmentManagerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDepartmentManager() throws Exception {
        // Initialize the database
        departmentManagerRepository.saveAndFlush(departmentManager);

        int databaseSizeBeforeDelete = departmentManagerRepository.findAll().size();

        // Delete the departmentManager
        restDepartmentManagerMockMvc.perform(delete("/api/department-managers/{id}", departmentManager.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DepartmentManager> departmentManagerList = departmentManagerRepository.findAll();
        assertThat(departmentManagerList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
