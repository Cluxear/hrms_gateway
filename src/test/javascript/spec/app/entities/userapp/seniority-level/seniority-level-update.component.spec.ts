import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { SeniorityLevelUpdateComponent } from 'app/entities/userapp/seniority-level/seniority-level-update.component';
import { SeniorityLevelService } from 'app/entities/userapp/seniority-level/seniority-level.service';
import { SeniorityLevel } from 'app/shared/model/userapp/seniority-level.model';

describe('Component Tests', () => {
  describe('SeniorityLevel Management Update Component', () => {
    let comp: SeniorityLevelUpdateComponent;
    let fixture: ComponentFixture<SeniorityLevelUpdateComponent>;
    let service: SeniorityLevelService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [SeniorityLevelUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SeniorityLevelUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SeniorityLevelUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SeniorityLevelService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SeniorityLevel(123);
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
        const entity = new SeniorityLevel();
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
