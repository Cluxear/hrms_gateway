import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { JobpostComponent } from 'app/entities/jobposting/jobpost/jobpost.component';
import { JobpostService } from 'app/entities/jobposting/jobpost/jobpost.service';
import { Jobpost } from 'app/shared/model/jobposting/jobpost.model';

describe('Component Tests', () => {
  describe('Jobpost Management Component', () => {
    let comp: JobpostComponent;
    let fixture: ComponentFixture<JobpostComponent>;
    let service: JobpostService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [JobpostComponent],
      })
        .overrideTemplate(JobpostComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(JobpostComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(JobpostService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Jobpost(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.jobposts && comp.jobposts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
