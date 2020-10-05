package com.diglab.employee.domain;

import io.swagger.annotations.ApiModel;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * The employee entity.\n@author juan.caicedo
 */
@ApiModel(description = "The employee entity.\n@author juan.caicedo")
@Entity
@Table(name = "employee")
public class Employee implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 50)
    @Column(name = "names", length = 50, nullable = false)
    private String names;

    @NotNull
    @Size(max = 50)
    @Column(name = "last_names", length = 50, nullable = false)
    private String lastNames;

    @NotNull
    @Size(max = 1)
    @Column(name = "gender", length = 1, nullable = false)
    private String gender;

    @NotNull
    @Column(name = "birth_date", nullable = false)
    private ZonedDateTime birthDate;

    @NotNull
    @Column(name = "hire_date", nullable = false)
    private ZonedDateTime hireDate;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNames() {
        return names;
    }

    public Employee names(String names) {
        this.names = names;
        return this;
    }

    public void setNames(String names) {
        this.names = names;
    }

    public String getLastNames() {
        return lastNames;
    }

    public Employee lastNames(String lastNames) {
        this.lastNames = lastNames;
        return this;
    }

    public void setLastNames(String lastNames) {
        this.lastNames = lastNames;
    }

    public String getGender() {
        return gender;
    }

    public Employee gender(String gender) {
        this.gender = gender;
        return this;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public ZonedDateTime getBirthDate() {
        return birthDate;
    }

    public Employee birthDate(ZonedDateTime birthDate) {
        this.birthDate = birthDate;
        return this;
    }

    public void setBirthDate(ZonedDateTime birthDate) {
        this.birthDate = birthDate;
    }

    public ZonedDateTime getHireDate() {
        return hireDate;
    }

    public Employee hireDate(ZonedDateTime hireDate) {
        this.hireDate = hireDate;
        return this;
    }

    public void setHireDate(ZonedDateTime hireDate) {
        this.hireDate = hireDate;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Employee)) {
            return false;
        }
        return id != null && id.equals(((Employee) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Employee{" +
            "id=" + getId() +
            ", names='" + getNames() + "'" +
            ", lastNames='" + getLastNames() + "'" +
            ", gender='" + getGender() + "'" +
            ", birthDate='" + getBirthDate() + "'" +
            ", hireDate='" + getHireDate() + "'" +
            "}";
    }
}
