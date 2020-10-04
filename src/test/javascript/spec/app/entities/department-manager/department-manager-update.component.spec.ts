import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TestDigLabTestModule } from '../../../test.module';
import { DepartmentManagerUpdateComponent } from 'app/entities/department-manager/department-manager-update.component';
import { DepartmentManagerService } from 'app/entities/department-manager/department-manager.service';
import { DepartmentManager } from 'app/shared/model/department-manager.model';

describe('Component Tests', () => {
  describe('DepartmentManager Management Update Component', () => {
    let comp: DepartmentManagerUpdateComponent;
    let fixture: ComponentFixture<DepartmentManagerUpdateComponent>;
    let service: DepartmentManagerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestDigLabTestModule],
        declarations: [DepartmentManagerUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DepartmentManagerUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DepartmentManagerUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DepartmentManagerService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DepartmentManager(123);
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
        const entity = new DepartmentManager();
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
