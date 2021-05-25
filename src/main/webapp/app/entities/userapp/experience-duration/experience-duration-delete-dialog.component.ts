import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExperienceDuration } from 'app/shared/model/userapp/experience-duration.model';
import { ExperienceDurationService } from './experience-duration.service';

@Component({
  templateUrl: './experience-duration-delete-dialog.component.html',
})
export class ExperienceDurationDeleteDialogComponent {
  experienceDuration?: IExperienceDuration;

  constructor(
    protected experienceDurationService: ExperienceDurationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.experienceDurationService.delete(id).subscribe(() => {
      this.eventManager.broadcast('experienceDurationListModification');
      this.activeModal.close();
    });
  }
}
