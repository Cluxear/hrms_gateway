import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { UserSkillComponent } from 'app/entities/dataapp/user-skill/user-skill.component';
import { UserSkillService } from 'app/entities/dataapp/user-skill/user-skill.service';
import { UserSkill } from 'app/shared/model/dataapp/user-skill.model';

describe('Component Tests', () => {
  describe('UserSkill Management Component', () => {
    let comp: UserSkillComponent;
    let fixture: ComponentFixture<UserSkillComponent>;
    let service: UserSkillService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [UserSkillComponent],
      })
        .overrideTemplate(UserSkillComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserSkillComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserSkillService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UserSkill(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.userSkills && comp.userSkills[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
