package com.diglab.employee.web.rest;

import com.diglab.employee.TestDigLabApp;
import com.diglab.employee.domain.DepartmentEmployee;
import com.diglab.employee.domain.Employee;
import com.diglab.employee.domain.Department;
import com.diglab.employee.repository.DepartmentEmployeeRepository;

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
 * Integration tests for the {@link DepartmentEmployeeResource} REST controller.
 */
@SpringBootTest(classes = TestDigLabApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class DepartmentEmployeeResourceIT {

    private static final ZonedDateTime DEFAULT_FROM_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FROM_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_TO_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_TO_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private DepartmentEmployeeRepository departmentEmployeeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDepartmentEmployeeMockMvc;

    private DepartmentEmployee departmentEmployee;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DepartmentEmployee createEntity(EntityManager em) {
        DepartmentEmployee departmentEmployee = new DepartmentEmployee()
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
        departmentEmployee.setEmployee(employee);
        // Add required entity
        Department department;
        if (TestUtil.findAll(em, Department.class).isEmpty()) {
            department = DepartmentResourceIT.createEntity(em);
            em.persist(department);
            em.flush();
        } else {
            department = TestUtil.findAll(em, Department.class).get(0);
        }
        departmentEmployee.setDepartment(department);
        return departmentEmployee;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DepartmentEmployee createUpdatedEntity(EntityManager em) {
        DepartmentEmployee departmentEmployee = new DepartmentEmployee()
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
        departmentEmployee.setEmployee(employee);
        // Add required entity
        Department department;
        if (TestUtil.findAll(em, Department.class).isEmpty()) {
            department = DepartmentResourceIT.createUpdatedEntity(em);
            em.persist(department);
            em.flush();
        } else {
            department = TestUtil.findAll(em, Department.class).get(0);
        }
        departmentEmployee.setDepartment(department);
        return departmentEmployee;
    }

    @BeforeEach
    public void initTest() {
        departmentEmployee = createEntity(em);
    }

    @Test
    @Transactional
    public void createDepartmentEmployee() throws Exception {
        int databaseSizeBeforeCreate = departmentEmployeeRepository.findAll().size();
        // Create the DepartmentEmployee
        restDepartmentEmployeeMockMvc.perform(post("/api/department-employees")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(departmentEmployee)))
            .andExpect(status().isCreated());

        // Validate the DepartmentEmployee in the database
        List<DepartmentEmployee> departmentEmployeeList = departmentEmployeeRepository.findAll();
        assertThat(departmentEmployeeList).hasSize(databaseSizeBeforeCreate + 1);
        DepartmentEmployee testDepartmentEmployee = departmentEmployeeList.get(departmentEmployeeList.size() - 1);
        assertThat(testDepartmentEmployee.getFromDate()).isEqualTo(DEFAULT_FROM_DATE);
        assertThat(testDepartmentEmployee.getToDate()).isEqualTo(DEFAULT_TO_DATE);
    }

    @Test
    @Transactional
    public void createDepartmentEmployeeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = departmentEmployeeRepository.findAll().size();

        // Create the DepartmentEmployee with an existing ID
        departmentEmployee.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDepartmentEmployeeMockMvc.perform(post("/api/department-employees")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(departmentEmployee)))
            .andExpect(status().isBadRequest());

        // Validate the DepartmentEmployee in the database
        List<DepartmentEmployee> departmentEmployeeList = departmentEmployeeRepository.findAll();
        assertThat(departmentEmployeeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkFromDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = departmentEmployeeRepository.findAll().size();
        // set the field null
        departmentEmployee.setFromDate(null);

        // Create the DepartmentEmployee, which fails.


        restDepartmentEmployeeMockMvc.perform(post("/api/department-employees")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(departmentEmployee)))
            .andExpect(status().isBadRequest());

        List<DepartmentEmployee> departmentEmployeeList = departmentEmployeeRepository.findAll();
        assertThat(departmentEmployeeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDepartmentEmployees() throws Exception {
        // Initialize the database
        departmentEmployeeRepository.saveAndFlush(departmentEmployee);

        // Get all the departmentEmployeeList
        restDepartmentEmployeeMockMvc.perform(get("/api/department-employees?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(departmentEmployee.getId().intValue())))
            .andExpect(jsonPath("$.[*].fromDate").value(hasItem(sameInstant(DEFAULT_FROM_DATE))))
            .andExpect(jsonPath("$.[*].toDate").value(hasItem(sameInstant(DEFAULT_TO_DATE))));
    }
    
    @Test
    @Transactional
    public void getDepartmentEmployee() throws Exception {
        // Initialize the database
        departmentEmployeeRepository.saveAndFlush(departmentEmployee);

        // Get the departmentEmployee
        restDepartmentEmployeeMockMvc.perform(get("/api/department-employees/{id}", departmentEmployee.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(departmentEmployee.getId().intValue()))
            .andExpect(jsonPath("$.fromDate").value(sameInstant(DEFAULT_FROM_DATE)))
            .andExpect(jsonPath("$.toDate").value(sameInstant(DEFAULT_TO_DATE)));
    }
    @Test
    @Transactional
    public void getNonExistingDepartmentEmployee() throws Exception {
        // Get the departmentEmployee
        restDepartmentEmployeeMockMvc.perform(get("/api/department-employees/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDepartmentEmployee() throws Exception {
        // Initialize the database
        departmentEmployeeRepository.saveAndFlush(departmentEmployee);

        int databaseSizeBeforeUpdate = departmentEmployeeRepository.findAll().size();

        // Update the departmentEmployee
        DepartmentEmployee updatedDepartmentEmployee = departmentEmployeeRepository.findById(departmentEmployee.getId()).get();
        // Disconnect from session so that the updates on updatedDepartmentEmployee are not directly saved in db
        em.detach(updatedDepartmentEmployee);
        updatedDepartmentEmployee
            .fromDate(UPDATED_FROM_DATE)
            .toDate(UPDATED_TO_DATE);

        restDepartmentEmployeeMockMvc.perform(put("/api/department-employees")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDepartmentEmployee)))
            .andExpect(status().isOk());

        // Validate the DepartmentEmployee in the database
        List<DepartmentEmployee> departmentEmployeeList = departmentEmployeeRepository.findAll();
        assertThat(departmentEmployeeList).hasSize(databaseSizeBeforeUpdate);
        DepartmentEmployee testDepartmentEmployee = departmentEmployeeList.get(departmentEmployeeList.size() - 1);
        assertThat(testDepartmentEmployee.getFromDate()).isEqualTo(UPDATED_FROM_DATE);
        assertThat(testDepartmentEmployee.getToDate()).isEqualTo(UPDATED_TO_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingDepartmentEmployee() throws Exception {
        int databaseSizeBeforeUpdate = departmentEmployeeRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDepartmentEmployeeMockMvc.perform(put("/api/department-employees")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(departmentEmployee)))
            .andExpect(status().isBadRequest());

        // Validate the DepartmentEmployee in the database
        List<DepartmentEmployee> departmentEmployeeList = departmentEmployeeRepository.findAll();
        assertThat(departmentEmployeeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDepartmentEmployee() throws Exception {
        // Initialize the database
        departmentEmployeeRepository.saveAndFlush(departmentEmployee);

        int databaseSizeBeforeDelete = departmentEmployeeRepository.findAll().size();

        // Delete the departmentEmployee
        restDepartmentEmployeeMockMvc.perform(delete("/api/department-employees/{id}", departmentEmployee.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DepartmentEmployee> departmentEmployeeList = departmentEmployeeRepository.findAll();
        assertThat(departmentEmployeeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
