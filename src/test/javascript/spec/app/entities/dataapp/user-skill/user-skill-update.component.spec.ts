import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { UserSkillUpdateComponent } from 'app/entities/dataapp/user-skill/user-skill-update.component';
import { UserSkillService } from 'app/entities/dataapp/user-skill/user-skill.service';
import { UserSkill } from 'app/shared/model/dataapp/user-skill.model';

describe('Component Tests', () => {
  describe('UserSkill Management Update Component', () => {
    let comp: UserSkillUpdateComponent;
    let fixture: ComponentFixture<UserSkillUpdateComponent>;
    let service: UserSkillService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [UserSkillUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(UserSkillUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserSkillUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserSkillService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserSkill(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserSkill();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
