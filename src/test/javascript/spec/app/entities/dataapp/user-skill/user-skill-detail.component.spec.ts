import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { UserSkillDetailComponent } from 'app/entities/dataapp/user-skill/user-skill-detail.component';
import { UserSkill } from 'app/shared/model/dataapp/user-skill.model';

describe('Component Tests', () => {
  describe('UserSkill Management Detail Component', () => {
    let comp: UserSkillDetailComponent;
    let fixture: ComponentFixture<UserSkillDetailComponent>;
    const route = ({ data: of({ userSkill: new UserSkill(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [UserSkillDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(UserSkillDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserSkillDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load userSkill on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.userSkill).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
