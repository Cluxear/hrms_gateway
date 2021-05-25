import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { ExperienceDurationDetailComponent } from 'app/entities/userapp/experience-duration/experience-duration-detail.component';
import { ExperienceDuration } from 'app/shared/model/userapp/experience-duration.model';

describe('Component Tests', () => {
  describe('ExperienceDuration Management Detail Component', () => {
    let comp: ExperienceDurationDetailComponent;
    let fixture: ComponentFixture<ExperienceDurationDetailComponent>;
    const route = ({ data: of({ experienceDuration: new ExperienceDuration(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [ExperienceDurationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ExperienceDurationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExperienceDurationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load experienceDuration on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.experienceDuration).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
