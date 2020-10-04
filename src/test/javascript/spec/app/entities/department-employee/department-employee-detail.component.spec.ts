import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestDigLabTestModule } from '../../../test.module';
import { DepartmentEmployeeDetailComponent } from 'app/entities/department-employee/department-employee-detail.component';
import { DepartmentEmployee } from 'app/shared/model/department-employee.model';

describe('Component Tests', () => {
  describe('DepartmentEmployee Management Detail Component', () => {
    let comp: DepartmentEmployeeDetailComponent;
    let fixture: ComponentFixture<DepartmentEmployeeDetailComponent>;
    const route = ({ data: of({ departmentEmployee: new DepartmentEmployee(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestDigLabTestModule],
        declarations: [DepartmentEmployeeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DepartmentEmployeeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DepartmentEmployeeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load departmentEmployee on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.departmentEmployee).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
