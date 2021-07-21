import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEvaluationSheet } from 'app/shared/model/interviewapp/evaluation-sheet.model';
import { EvaluationSheetService } from './evaluation-sheet.service';

@Component({
  templateUrl: './evaluation-sheet-delete-dialog.component.html',
})
export class EvaluationSheetDeleteDialogComponent {
  evaluationSheet?: IEvaluationSheet;

  constructor(
    protected evaluationSheetService: EvaluationSheetService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.evaluationSheetService.delete(id).subscribe(() => {
      this.eventManager.broadcast('evaluationSheetListModification');
      this.activeModal.close();
    });
  }
}
