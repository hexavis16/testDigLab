import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestDigLabTestModule } from '../../../test.module';
import { TitleComponent } from 'app/entities/title/title.component';
import { TitleService } from 'app/entities/title/title.service';
import { Title } from 'app/shared/model/title.model';

describe('Component Tests', () => {
  describe('Title Management Component', () => {
    let comp: TitleComponent;
    let fixture: ComponentFixture<TitleComponent>;
    let service: TitleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestDigLabTestModule],
        declarations: [TitleComponent],
      })
        .overrideTemplate(TitleComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TitleComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TitleService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Title(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.titles && comp.titles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
