import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IApplicationRecrutementStatus } from 'app/shared/model/applicationapp/application-recrutement-status.model';
import { ApplicationRecrutementStatusService } from './application-recrutement-status.service';

@Component({
  templateUrl: './application-recrutement-status-delete-dialog.component.html',
})
export class ApplicationRecrutementStatusDeleteDialogComponent {
  applicationRecrutementStatus?: IApplicationRecrutementStatus;

  constructor(
    protected applicationRecrutementStatusService: ApplicationRecrutementStatusService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.applicationRecrutementStatusService.delete(id).subscribe(() => {
      this.eventManager.broadcast('applicationRecrutementStatusListModification');
      this.activeModal.close();
    });
  }
}
