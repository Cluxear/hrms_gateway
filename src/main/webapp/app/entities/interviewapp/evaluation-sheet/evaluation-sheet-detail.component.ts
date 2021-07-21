import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEvaluationSheet } from 'app/shared/model/interviewapp/evaluation-sheet.model';

@Component({
  selector: 'jhi-evaluation-sheet-detail',
  templateUrl: './evaluation-sheet-detail.component.html',
})
export class EvaluationSheetDetailComponent implements OnInit {
  evaluationSheet: IEvaluationSheet | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ evaluationSheet }) => (this.evaluationSheet = evaluationSheet));
  }

  previousState(): void {
    window.history.back();
  }
}
