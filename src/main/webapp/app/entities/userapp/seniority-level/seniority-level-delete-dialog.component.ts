import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISeniorityLevel } from 'app/shared/model/userapp/seniority-level.model';
import { SeniorityLevelService } from './seniority-level.service';

@Component({
  templateUrl: './seniority-level-delete-dialog.component.html',
})
export class SeniorityLevelDeleteDialogComponent {
  seniorityLevel?: ISeniorityLevel;

  constructor(
    protected seniorityLevelService: SeniorityLevelService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.seniorityLevelService.delete(id).subscribe(() => {
      this.eventManager.broadcast('seniorityLevelListModification');
      this.activeModal.close();
    });
  }
}
