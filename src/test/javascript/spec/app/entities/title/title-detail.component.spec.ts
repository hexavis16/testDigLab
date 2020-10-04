import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestDigLabTestModule } from '../../../test.module';
import { TitleDetailComponent } from 'app/entities/title/title-detail.component';
import { Title } from 'app/shared/model/title.model';

describe('Component Tests', () => {
  describe('Title Management Detail Component', () => {
    let comp: TitleDetailComponent;
    let fixture: ComponentFixture<TitleDetailComponent>;
    const route = ({ data: of({ title: new Title(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestDigLabTestModule],
        declarations: [TitleDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TitleDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TitleDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load title on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.title).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
