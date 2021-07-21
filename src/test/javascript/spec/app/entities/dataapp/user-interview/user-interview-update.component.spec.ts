import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { UserInterviewUpdateComponent } from 'app/entities/dataapp/user-interview/user-interview-update.component';
import { UserInterviewService } from 'app/entities/dataapp/user-interview/user-interview.service';
import { UserInterview } from 'app/shared/model/dataapp/user-interview.model';

describe('Component Tests', () => {
  describe('UserInterview Management Update Component', () => {
    let comp: UserInterviewUpdateComponent;
    let fixture: ComponentFixture<UserInterviewUpdateComponent>;
    let service: UserInterviewService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [UserInterviewUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(UserInterviewUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserInterviewUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserInterviewService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserInterview(123);
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
        const entity = new UserInterview();
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
