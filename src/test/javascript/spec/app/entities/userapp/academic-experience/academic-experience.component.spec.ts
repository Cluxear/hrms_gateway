import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { AcademicExperienceComponent } from 'app/entities/userapp/academic-experience/academic-experience.component';
import { AcademicExperienceService } from 'app/entities/userapp/academic-experience/academic-experience.service';
import { AcademicExperience } from 'app/shared/model/userapp/academic-experience.model';

describe('Component Tests', () => {
  describe('AcademicExperience Management Component', () => {
    let comp: AcademicExperienceComponent;
    let fixture: ComponentFixture<AcademicExperienceComponent>;
    let service: AcademicExperienceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [AcademicExperienceComponent],
      })
        .overrideTemplate(AcademicExperienceComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AcademicExperienceComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AcademicExperienceService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AcademicExperience(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.academicExperiences && comp.academicExperiences[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
