import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestDigLabTestModule } from '../../../test.module';
import { DepartmentManagerDetailComponent } from 'app/entities/department-manager/department-manager-detail.component';
import { DepartmentManager } from 'app/shared/model/department-manager.model';

describe('Component Tests', () => {
  describe('DepartmentManager Management Detail Component', () => {
    let comp: DepartmentManagerDetailComponent;
    let fixture: ComponentFixture<DepartmentManagerDetailComponent>;
    const route = ({ data: of({ departmentManager: new DepartmentManager(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestDigLabTestModule],
        declarations: [DepartmentManagerDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DepartmentManagerDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DepartmentManagerDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load departmentManager on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.departmentManager).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
