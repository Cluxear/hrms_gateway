import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { ExperienceDurationUpdateComponent } from 'app/entities/userapp/experience-duration/experience-duration-update.component';
import { ExperienceDurationService } from 'app/entities/userapp/experience-duration/experience-duration.service';
import { ExperienceDuration } from 'app/shared/model/userapp/experience-duration.model';

describe('Component Tests', () => {
  describe('ExperienceDuration Management Update Component', () => {
    let comp: ExperienceDurationUpdateComponent;
    let fixture: ComponentFixture<ExperienceDurationUpdateComponent>;
    let service: ExperienceDurationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [ExperienceDurationUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ExperienceDurationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExperienceDurationUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExperienceDurationService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ExperienceDuration(123);
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
        const entity = new ExperienceDuration();
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
