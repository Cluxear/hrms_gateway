import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HrmsGatewayTestModule } from '../../../../test.module';
import { EvaluationSheetDetailComponent } from 'app/entities/interviewapp/evaluation-sheet/evaluation-sheet-detail.component';
import { EvaluationSheet } from 'app/shared/model/interviewapp/evaluation-sheet.model';

describe('Component Tests', () => {
  describe('EvaluationSheet Management Detail Component', () => {
    let comp: EvaluationSheetDetailComponent;
    let fixture: ComponentFixture<EvaluationSheetDetailComponent>;
    const route = ({ data: of({ evaluationSheet: new EvaluationSheet(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HrmsGatewayTestModule],
        declarations: [EvaluationSheetDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(EvaluationSheetDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EvaluationSheetDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load evaluationSheet on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.evaluationSheet).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
