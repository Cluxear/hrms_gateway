import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { UserInterviewComponent } from 'app/entities/dataapp/user-interview/user-interview.component';
import { UserInterviewService } from 'app/entities/dataapp/user-interview/user-interview.service';
import { UserInterview } from 'app/shared/model/dataapp/user-interview.model';

describe('Component Tests', () => {
  describe('UserInterview Management Component', () => {
    let comp: UserInterviewComponent;
    let fixture: ComponentFixture<UserInterviewComponent>;
    let service: UserInterviewService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [UserInterviewComponent],
      })
        .overrideTemplate(UserInterviewComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserInterviewComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserInterviewService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UserInterview(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.userInterviews && comp.userInterviews[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
