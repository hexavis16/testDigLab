import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestDigLabTestModule } from '../../../test.module';
import { DepartmentEmployeeComponent } from 'app/entities/department-employee/department-employee.component';
import { DepartmentEmployeeService } from 'app/entities/department-employee/department-employee.service';
import { DepartmentEmployee } from 'app/shared/model/department-employee.model';

describe('Component Tests', () => {
  describe('DepartmentEmployee Management Component', () => {
    let comp: DepartmentEmployeeComponent;
    let fixture: ComponentFixture<DepartmentEmployeeComponent>;
    let service: DepartmentEmployeeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestDigLabTestModule],
        declarations: [DepartmentEmployeeComponent],
      })
        .overrideTemplate(DepartmentEmployeeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DepartmentEmployeeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DepartmentEmployeeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DepartmentEmployee(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.departmentEmployees && comp.departmentEmployees[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
