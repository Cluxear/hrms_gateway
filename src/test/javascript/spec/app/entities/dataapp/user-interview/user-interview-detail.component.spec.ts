import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { UserInterviewDetailComponent } from 'app/entities/dataapp/user-interview/user-interview-detail.component';
import { UserInterview } from 'app/shared/model/dataapp/user-interview.model';

describe('Component Tests', () => {
  describe('UserInterview Management Detail Component', () => {
    let comp: UserInterviewDetailComponent;
    let fixture: ComponentFixture<UserInterviewDetailComponent>;
    const route = ({ data: of({ userInterview: new UserInterview(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [UserInterviewDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(UserInterviewDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserInterviewDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load userInterview on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.userInterview).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
