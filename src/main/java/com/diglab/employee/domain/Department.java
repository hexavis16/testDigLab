package com.diglab.employee.domain;

import io.swagger.annotations.ApiModel;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * The Department entity.\n@author juan.caicedo
 */
@ApiModel(description = "The Department entity.\n@author juan.caicedo")
@Entity
@Table(name = "department")
public class Department implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "department")
    private Set<DepartmentEmployee> departmentEmployees = new HashSet<>();

    @OneToMany(mappedBy = "department")
    private Set<DepartmentManager> departmentManaders = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Department name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<DepartmentEmployee> getDepartmentEmployees() {
        return departmentEmployees;
    }

    public Department departmentEmployees(Set<DepartmentEmployee> departmentEmployees) {
        this.departmentEmployees = departmentEmployees;
        return this;
    }

    public Department addDepartmentEmployee(DepartmentEmployee departmentEmployee) {
        this.departmentEmployees.add(departmentEmployee);
        departmentEmployee.setDepartment(this);
        return this;
    }

    public Department removeDepartmentEmployee(DepartmentEmployee departmentEmployee) {
        this.departmentEmployees.remove(departmentEmployee);
        departmentEmployee.setDepartment(null);
        return this;
    }

    public void setDepartmentEmployees(Set<DepartmentEmployee> departmentEmployees) {
        this.departmentEmployees = departmentEmployees;
    }

    public Set<DepartmentManager> getDepartmentManaders() {
        return departmentManaders;
    }

    public Department departmentManaders(Set<DepartmentManager> departmentManagers) {
        this.departmentManaders = departmentManagers;
        return this;
    }

    public Department addDepartmentManader(DepartmentManager departmentManager) {
        this.departmentManaders.add(departmentManager);
        departmentManager.setDepartment(this);
        return this;
    }

    public Department removeDepartmentManader(DepartmentManager departmentManager) {
        this.departmentManaders.remove(departmentManager);
        departmentManager.setDepartment(null);
        return this;
    }

    public void setDepartmentManaders(Set<DepartmentManager> departmentManagers) {
        this.departmentManaders = departmentManagers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Department)) {
            return false;
        }
        return id != null && id.equals(((Department) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Department{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}