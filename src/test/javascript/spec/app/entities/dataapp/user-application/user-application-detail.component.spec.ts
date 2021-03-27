import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { UserApplicationDetailComponent } from 'app/entities/dataapp/user-application/user-application-detail.component';
import { UserApplication } from 'app/shared/model/dataapp/user-application.model';

describe('Component Tests', () => {
  describe('UserApplication Management Detail Component', () => {
    let comp: UserApplicationDetailComponent;
    let fixture: ComponentFixture<UserApplicationDetailComponent>;
    const route = ({ data: of({ userApplication: new UserApplication(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [UserApplicationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(UserApplicationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserApplicationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load userApplication on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.userApplication).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
