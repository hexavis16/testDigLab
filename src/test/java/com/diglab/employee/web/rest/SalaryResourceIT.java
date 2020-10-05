package com.diglab.employee.web.rest;

import com.diglab.employee.TestDigLabApp;
import com.diglab.employee.domain.Salary;
import com.diglab.employee.domain.Employee;
import com.diglab.employee.repository.SalaryRepository;

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
 * Integration tests for the {@link SalaryResource} REST controller.
 */
@SpringBootTest(classes = TestDigLabApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class SalaryResourceIT {

    private static final Integer DEFAULT_AMOUNT = 1;
    private static final Integer UPDATED_AMOUNT = 2;

    private static final ZonedDateTime DEFAULT_FROM_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FROM_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_TO_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_TO_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private SalaryRepository salaryRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSalaryMockMvc;

    private Salary salary;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Salary createEntity(EntityManager em) {
        Salary salary = new Salary()
            .amount(DEFAULT_AMOUNT)
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
        salary.setEmployee(employee);
        return salary;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Salary createUpdatedEntity(EntityManager em) {
        Salary salary = new Salary()
            .amount(UPDATED_AMOUNT)
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
        salary.setEmployee(employee);
        return salary;
    }

    @BeforeEach
    public void initTest() {
        salary = createEntity(em);
    }

    @Test
    @Transactional
    public void createSalary() throws Exception {
        int databaseSizeBeforeCreate = salaryRepository.findAll().size();
        // Create the Salary
        restSalaryMockMvc.perform(post("/api/salaries")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(salary)))
            .andExpect(status().isCreated());

        // Validate the Salary in the database
        List<Salary> salaryList = salaryRepository.findAll();
        assertThat(salaryList).hasSize(databaseSizeBeforeCreate + 1);
        Salary testSalary = salaryList.get(salaryList.size() - 1);
        assertThat(testSalary.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testSalary.getFromDate()).isEqualTo(DEFAULT_FROM_DATE);
        assertThat(testSalary.getToDate()).isEqualTo(DEFAULT_TO_DATE);
    }

    @Test
    @Transactional
    public void createSalaryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = salaryRepository.findAll().size();

        // Create the Salary with an existing ID
        salary.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSalaryMockMvc.perform(post("/api/salaries")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(salary)))
            .andExpect(status().isBadRequest());

        // Validate the Salary in the database
        List<Salary> salaryList = salaryRepository.findAll();
        assertThat(salaryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = salaryRepository.findAll().size();
        // set the field null
        salary.setAmount(null);

        // Create the Salary, which fails.


        restSalaryMockMvc.perform(post("/api/salaries")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(salary)))
            .andExpect(status().isBadRequest());

        List<Salary> salaryList = salaryRepository.findAll();
        assertThat(salaryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFromDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = salaryRepository.findAll().size();
        // set the field null
        salary.setFromDate(null);

        // Create the Salary, which fails.


        restSalaryMockMvc.perform(post("/api/salaries")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(salary)))
            .andExpect(status().isBadRequest());

        List<Salary> salaryList = salaryRepository.findAll();
        assertThat(salaryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSalaries() throws Exception {
        // Initialize the database
        salaryRepository.saveAndFlush(salary);

        // Get all the salaryList
        restSalaryMockMvc.perform(get("/api/salaries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(salary.getId().intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT)))
            .andExpect(jsonPath("$.[*].fromDate").value(hasItem(sameInstant(DEFAULT_FROM_DATE))))
            .andExpect(jsonPath("$.[*].toDate").value(hasItem(sameInstant(DEFAULT_TO_DATE))));
    }
    
    @Test
    @Transactional
    public void getSalary() throws Exception {
        // Initialize the database
        salaryRepository.saveAndFlush(salary);

        // Get the salary
        restSalaryMockMvc.perform(get("/api/salaries/{id}", salary.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(salary.getId().intValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT))
            .andExpect(jsonPath("$.fromDate").value(sameInstant(DEFAULT_FROM_DATE)))
            .andExpect(jsonPath("$.toDate").value(sameInstant(DEFAULT_TO_DATE)));
    }
    @Test
    @Transactional
    public void getNonExistingSalary() throws Exception {
        // Get the salary
        restSalaryMockMvc.perform(get("/api/salaries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSalary() throws Exception {
        // Initialize the database
        salaryRepository.saveAndFlush(salary);

        int databaseSizeBeforeUpdate = salaryRepository.findAll().size();

        // Update the salary
        Salary updatedSalary = salaryRepository.findById(salary.getId()).get();
        // Disconnect from session so that the updates on updatedSalary are not directly saved in db
        em.detach(updatedSalary);
        updatedSalary
            .amount(UPDATED_AMOUNT)
            .fromDate(UPDATED_FROM_DATE)
            .toDate(UPDATED_TO_DATE);

        restSalaryMockMvc.perform(put("/api/salaries")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSalary)))
            .andExpect(status().isOk());

        // Validate the Salary in the database
        List<Salary> salaryList = salaryRepository.findAll();
        assertThat(salaryList).hasSize(databaseSizeBeforeUpdate);
        Salary testSalary = salaryList.get(salaryList.size() - 1);
        assertThat(testSalary.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testSalary.getFromDate()).isEqualTo(UPDATED_FROM_DATE);
        assertThat(testSalary.getToDate()).isEqualTo(UPDATED_TO_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingSalary() throws Exception {
        int databaseSizeBeforeUpdate = salaryRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSalaryMockMvc.perform(put("/api/salaries")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(salary)))
            .andExpect(status().isBadRequest());

        // Validate the Salary in the database
        List<Salary> salaryList = salaryRepository.findAll();
        assertThat(salaryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSalary() throws Exception {
        // Initialize the database
        salaryRepository.saveAndFlush(salary);

        int databaseSizeBeforeDelete = salaryRepository.findAll().size();

        // Delete the salary
        restSalaryMockMvc.perform(delete("/api/salaries/{id}", salary.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Salary> salaryList = salaryRepository.findAll();
        assertThat(salaryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
