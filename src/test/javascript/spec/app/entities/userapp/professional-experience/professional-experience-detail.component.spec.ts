import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { ProfessionalExperienceDetailComponent } from 'app/entities/userapp/professional-experience/professional-experience-detail.component';
import { ProfessionalExperience } from 'app/shared/model/userapp/professional-experience.model';

describe('Component Tests', () => {
  describe('ProfessionalExperience Management Detail Component', () => {
    let comp: ProfessionalExperienceDetailComponent;
    let fixture: ComponentFixture<ProfessionalExperienceDetailComponent>;
    const route = ({ data: of({ professionalExperience: new ProfessionalExperience(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [ProfessionalExperienceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProfessionalExperienceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProfessionalExperienceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load professionalExperience on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.professionalExperience).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
