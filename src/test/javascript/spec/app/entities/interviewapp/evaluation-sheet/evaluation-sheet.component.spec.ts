import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { EvaluationSheetComponent } from 'app/entities/interviewapp/evaluation-sheet/evaluation-sheet.component';
import { EvaluationSheetService } from 'app/entities/interviewapp/evaluation-sheet/evaluation-sheet.service';
import { EvaluationSheet } from 'app/shared/model/interviewapp/evaluation-sheet.model';

describe('Component Tests', () => {
  describe('EvaluationSheet Management Component', () => {
    let comp: EvaluationSheetComponent;
    let fixture: ComponentFixture<EvaluationSheetComponent>;
    let service: EvaluationSheetService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [EvaluationSheetComponent],
      })
        .overrideTemplate(EvaluationSheetComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EvaluationSheetComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EvaluationSheetService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EvaluationSheet(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.evaluationSheets && comp.evaluationSheets[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
