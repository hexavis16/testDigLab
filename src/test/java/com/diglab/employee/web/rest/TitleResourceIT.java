package com.diglab.employee.web.rest;

import com.diglab.employee.TestDigLabApp;
import com.diglab.employee.domain.Title;
import com.diglab.employee.repository.TitleRepository;

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
 * Integration tests for the {@link TitleResource} REST controller.
 */
@SpringBootTest(classes = TestDigLabApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TitleResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_FROM_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FROM_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_TO_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_TO_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private TitleRepository titleRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTitleMockMvc;

    private Title title;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Title createEntity(EntityManager em) {
        Title title = new Title()
            .title(DEFAULT_TITLE)
            .fromDate(DEFAULT_FROM_DATE)
            .toDate(DEFAULT_TO_DATE);
        return title;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Title createUpdatedEntity(EntityManager em) {
        Title title = new Title()
            .title(UPDATED_TITLE)
            .fromDate(UPDATED_FROM_DATE)
            .toDate(UPDATED_TO_DATE);
        return title;
    }

    @BeforeEach
    public void initTest() {
        title = createEntity(em);
    }

    @Test
    @Transactional
    public void createTitle() throws Exception {
        int databaseSizeBeforeCreate = titleRepository.findAll().size();
        // Create the Title
        restTitleMockMvc.perform(post("/api/titles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(title)))
            .andExpect(status().isCreated());

        // Validate the Title in the database
        List<Title> titleList = titleRepository.findAll();
        assertThat(titleList).hasSize(databaseSizeBeforeCreate + 1);
        Title testTitle = titleList.get(titleList.size() - 1);
        assertThat(testTitle.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testTitle.getFromDate()).isEqualTo(DEFAULT_FROM_DATE);
        assertThat(testTitle.getToDate()).isEqualTo(DEFAULT_TO_DATE);
    }

    @Test
    @Transactional
    public void createTitleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = titleRepository.findAll().size();

        // Create the Title with an existing ID
        title.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTitleMockMvc.perform(post("/api/titles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(title)))
            .andExpect(status().isBadRequest());

        // Validate the Title in the database
        List<Title> titleList = titleRepository.findAll();
        assertThat(titleList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = titleRepository.findAll().size();
        // set the field null
        title.setTitle(null);

        // Create the Title, which fails.


        restTitleMockMvc.perform(post("/api/titles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(title)))
            .andExpect(status().isBadRequest());

        List<Title> titleList = titleRepository.findAll();
        assertThat(titleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFromDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = titleRepository.findAll().size();
        // set the field null
        title.setFromDate(null);

        // Create the Title, which fails.


        restTitleMockMvc.perform(post("/api/titles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(title)))
            .andExpect(status().isBadRequest());

        List<Title> titleList = titleRepository.findAll();
        assertThat(titleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTitles() throws Exception {
        // Initialize the database
        titleRepository.saveAndFlush(title);

        // Get all the titleList
        restTitleMockMvc.perform(get("/api/titles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(title.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].fromDate").value(hasItem(sameInstant(DEFAULT_FROM_DATE))))
            .andExpect(jsonPath("$.[*].toDate").value(hasItem(sameInstant(DEFAULT_TO_DATE))));
    }
    
    @Test
    @Transactional
    public void getTitle() throws Exception {
        // Initialize the database
        titleRepository.saveAndFlush(title);

        // Get the title
        restTitleMockMvc.perform(get("/api/titles/{id}", title.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(title.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.fromDate").value(sameInstant(DEFAULT_FROM_DATE)))
            .andExpect(jsonPath("$.toDate").value(sameInstant(DEFAULT_TO_DATE)));
    }
    @Test
    @Transactional
    public void getNonExistingTitle() throws Exception {
        // Get the title
        restTitleMockMvc.perform(get("/api/titles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTitle() throws Exception {
        // Initialize the database
        titleRepository.saveAndFlush(title);

        int databaseSizeBeforeUpdate = titleRepository.findAll().size();

        // Update the title
        Title updatedTitle = titleRepository.findById(title.getId()).get();
        // Disconnect from session so that the updates on updatedTitle are not directly saved in db
        em.detach(updatedTitle);
        updatedTitle
            .title(UPDATED_TITLE)
            .fromDate(UPDATED_FROM_DATE)
            .toDate(UPDATED_TO_DATE);

        restTitleMockMvc.perform(put("/api/titles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTitle)))
            .andExpect(status().isOk());

        // Validate the Title in the database
        List<Title> titleList = titleRepository.findAll();
        assertThat(titleList).hasSize(databaseSizeBeforeUpdate);
        Title testTitle = titleList.get(titleList.size() - 1);
        assertThat(testTitle.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testTitle.getFromDate()).isEqualTo(UPDATED_FROM_DATE);
        assertThat(testTitle.getToDate()).isEqualTo(UPDATED_TO_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingTitle() throws Exception {
        int databaseSizeBeforeUpdate = titleRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTitleMockMvc.perform(put("/api/titles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(title)))
            .andExpect(status().isBadRequest());

        // Validate the Title in the database
        List<Title> titleList = titleRepository.findAll();
        assertThat(titleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTitle() throws Exception {
        // Initialize the database
        titleRepository.saveAndFlush(title);

        int databaseSizeBeforeDelete = titleRepository.findAll().size();

        // Delete the title
        restTitleMockMvc.perform(delete("/api/titles/{id}", title.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Title> titleList = titleRepository.findAll();
        assertThat(titleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
