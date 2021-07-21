import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserFileData } from 'app/shared/model/userapp/user-file-data.model';
import { UserFileDataService } from './user-file-data.service';

@Component({
  templateUrl: './user-file-data-delete-dialog.component.html',
})
export class UserFileDataDeleteDialogComponent {
  userFileData?: IUserFileData;

  constructor(
    protected userFileDataService: UserFileDataService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.userFileDataService.delete(id).subscribe(() => {
      this.eventManager.broadcast('userFileDataListModification');
      this.activeModal.close();
    });
  }
}
