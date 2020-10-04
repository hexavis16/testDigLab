package com.diglab.employee.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.diglab.employee.web.rest.TestUtil;

public class TitleTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Title.class);
        Title title1 = new Title();
        title1.setId(1L);
        Title title2 = new Title();
        title2.setId(title1.getId());
        assertThat(title1).isEqualTo(title2);
        title2.setId(2L);
        assertThat(title1).isNotEqualTo(title2);
        title1.setId(null);
        assertThat(title1).isNotEqualTo(title2);
    }
}
