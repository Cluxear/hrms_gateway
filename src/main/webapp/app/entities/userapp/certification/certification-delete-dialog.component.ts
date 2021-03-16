import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICertification } from 'app/shared/model/userapp/certification.model';
import { CertificationService } from './certification.service';

@Component({
  templateUrl: './certification-delete-dialog.component.html',
})
export class CertificationDeleteDialogComponent {
  certification?: ICertification;

  constructor(
    protected certificationService: CertificationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.certificationService.delete(id).subscribe(() => {
      this.eventManager.broadcast('certificationListModification');
      this.activeModal.close();
    });
  }
}
