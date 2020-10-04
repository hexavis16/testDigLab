import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestDigLabTestModule } from '../../../test.module';
import { DepartmentManagerComponent } from 'app/entities/department-manager/department-manager.component';
import { DepartmentManagerService } from 'app/entities/department-manager/department-manager.service';
import { DepartmentManager } from 'app/shared/model/department-manager.model';

describe('Component Tests', () => {
  describe('DepartmentManager Management Component', () => {
    let comp: DepartmentManagerComponent;
    let fixture: ComponentFixture<DepartmentManagerComponent>;
    let service: DepartmentManagerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestDigLabTestModule],
        declarations: [DepartmentManagerComponent],
      })
        .overrideTemplate(DepartmentManagerComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DepartmentManagerComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DepartmentManagerService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DepartmentManager(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.departmentManagers && comp.departmentManagers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
