import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TestDigLabTestModule } from '../../../test.module';
import { DepartmentEmployeeUpdateComponent } from 'app/entities/department-employee/department-employee-update.component';
import { DepartmentEmployeeService } from 'app/entities/department-employee/department-employee.service';
import { DepartmentEmployee } from 'app/shared/model/department-employee.model';

describe('Component Tests', () => {
  describe('DepartmentEmployee Management Update Component', () => {
    let comp: DepartmentEmployeeUpdateComponent;
    let fixture: ComponentFixture<DepartmentEmployeeUpdateComponent>;
    let service: DepartmentEmployeeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestDigLabTestModule],
        declarations: [DepartmentEmployeeUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DepartmentEmployeeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DepartmentEmployeeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DepartmentEmployeeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DepartmentEmployee(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new DepartmentEmployee();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
