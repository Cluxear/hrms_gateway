import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDegreeLevel } from 'app/shared/model/userapp/degree-level.model';
import { DegreeLevelService } from './degree-level.service';

@Component({
  templateUrl: './degree-level-delete-dialog.component.html',
})
export class DegreeLevelDeleteDialogComponent {
  degreeLevel?: IDegreeLevel;

  constructor(
    protected degreeLevelService: DegreeLevelService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.degreeLevelService.delete(id).subscribe(() => {
      this.eventManager.broadcast('degreeLevelListModification');
      this.activeModal.close();
    });
  }
}
