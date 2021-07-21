import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { UserFileDataDetailComponent } from 'app/entities/userapp/user-file-data/user-file-data-detail.component';
import { UserFileData } from 'app/shared/model/userapp/user-file-data.model';

describe('Component Tests', () => {
  describe('UserFileData Management Detail Component', () => {
    let comp: UserFileDataDetailComponent;
    let fixture: ComponentFixture<UserFileDataDetailComponent>;
    const route = ({ data: of({ userFileData: new UserFileData(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [UserFileDataDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(UserFileDataDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserFileDataDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load userFileData on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.userFileData).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
