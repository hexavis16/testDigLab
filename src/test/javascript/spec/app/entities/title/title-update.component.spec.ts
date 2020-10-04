import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TestDigLabTestModule } from '../../../test.module';
import { TitleUpdateComponent } from 'app/entities/title/title-update.component';
import { TitleService } from 'app/entities/title/title.service';
import { Title } from 'app/shared/model/title.model';

describe('Component Tests', () => {
  describe('Title Management Update Component', () => {
    let comp: TitleUpdateComponent;
    let fixture: ComponentFixture<TitleUpdateComponent>;
    let service: TitleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestDigLabTestModule],
        declarations: [TitleUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TitleUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TitleUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TitleService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Title(123);
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
        const entity = new Title();
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
