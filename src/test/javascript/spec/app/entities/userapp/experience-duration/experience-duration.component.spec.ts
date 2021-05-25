import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { ExperienceDurationComponent } from 'app/entities/userapp/experience-duration/experience-duration.component';
import { ExperienceDurationService } from 'app/entities/userapp/experience-duration/experience-duration.service';
import { ExperienceDuration } from 'app/shared/model/userapp/experience-duration.model';

describe('Component Tests', () => {
  describe('ExperienceDuration Management Component', () => {
    let comp: ExperienceDurationComponent;
    let fixture: ComponentFixture<ExperienceDurationComponent>;
    let service: ExperienceDurationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [ExperienceDurationComponent],
      })
        .overrideTemplate(ExperienceDurationComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExperienceDurationComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExperienceDurationService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ExperienceDuration(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.experienceDurations && comp.experienceDurations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
