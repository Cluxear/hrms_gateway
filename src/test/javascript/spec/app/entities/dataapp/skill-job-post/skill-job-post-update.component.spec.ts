import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { SkillJobPostUpdateComponent } from 'app/entities/dataapp/skill-job-post/skill-job-post-update.component';
import { SkillJobPostService } from 'app/entities/dataapp/skill-job-post/skill-job-post.service';
import { SkillJobPost } from 'app/shared/model/dataapp/skill-job-post.model';

describe('Component Tests', () => {
  describe('SkillJobPost Management Update Component', () => {
    let comp: SkillJobPostUpdateComponent;
    let fixture: ComponentFixture<SkillJobPostUpdateComponent>;
    let service: SkillJobPostService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [SkillJobPostUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SkillJobPostUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SkillJobPostUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SkillJobPostService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SkillJobPost(123);
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
        const entity = new SkillJobPost();
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
