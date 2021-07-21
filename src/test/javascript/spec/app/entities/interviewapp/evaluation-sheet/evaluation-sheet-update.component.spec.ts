import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { EvaluationSheetUpdateComponent } from 'app/entities/interviewapp/evaluation-sheet/evaluation-sheet-update.component';
import { EvaluationSheetService } from 'app/entities/interviewapp/evaluation-sheet/evaluation-sheet.service';
import { EvaluationSheet } from 'app/shared/model/interviewapp/evaluation-sheet.model';

describe('Component Tests', () => {
  describe('EvaluationSheet Management Update Component', () => {
    let comp: EvaluationSheetUpdateComponent;
    let fixture: ComponentFixture<EvaluationSheetUpdateComponent>;
    let service: EvaluationSheetService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [EvaluationSheetUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(EvaluationSheetUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EvaluationSheetUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EvaluationSheetService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EvaluationSheet(123);
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
        const entity = new EvaluationSheet();
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
