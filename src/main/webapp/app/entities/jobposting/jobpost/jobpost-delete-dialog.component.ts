import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IJobpost } from 'app/shared/model/jobposting/jobpost.model';
import { JobpostService } from './jobpost.service';

@Component({
  templateUrl: './jobpost-delete-dialog.component.html',
})
export class JobpostDeleteDialogComponent {
  jobpost?: IJobpost;

  constructor(protected jobpostService: JobpostService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.jobpostService.delete(id).subscribe(() => {
      this.eventManager.broadcast('jobpostListModification');
      this.activeModal.close();
    });
  }
}
