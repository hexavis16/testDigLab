package com.diglab.employee.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.diglab.employee.web.rest.TestUtil;

public class DepartmentManagerTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DepartmentManager.class);
        DepartmentManager departmentManager1 = new DepartmentManager();
        departmentManager1.setId(1L);
        DepartmentManager departmentManager2 = new DepartmentManager();
        departmentManager2.setId(departmentManager1.getId());
        assertThat(departmentManager1).isEqualTo(departmentManager2);
        departmentManager2.setId(2L);
        assertThat(departmentManager1).isNotEqualTo(departmentManager2);
        departmentManager1.setId(null);
        assertThat(departmentManager1).isNotEqualTo(departmentManager2);
    }
}
