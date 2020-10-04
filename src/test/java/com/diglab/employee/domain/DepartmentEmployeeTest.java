package com.diglab.employee.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.diglab.employee.web.rest.TestUtil;

public class DepartmentEmployeeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DepartmentEmployee.class);
        DepartmentEmployee departmentEmployee1 = new DepartmentEmployee();
        departmentEmployee1.setId(1L);
        DepartmentEmployee departmentEmployee2 = new DepartmentEmployee();
        departmentEmployee2.setId(departmentEmployee1.getId());
        assertThat(departmentEmployee1).isEqualTo(departmentEmployee2);
        departmentEmployee2.setId(2L);
        assertThat(departmentEmployee1).isNotEqualTo(departmentEmployee2);
        departmentEmployee1.setId(null);
        assertThat(departmentEmployee1).isNotEqualTo(departmentEmployee2);
    }
}
