import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserInterview } from 'app/shared/model/dataapp/user-interview.model';
import { UserInterviewService } from './user-interview.service';

@Component({
  templateUrl: './user-interview-delete-dialog.component.html',
})
export class UserInterviewDeleteDialogComponent {
  userInterview?: IUserInterview;

  constructor(
    protected userInterviewService: UserInterviewService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.userInterviewService.delete(id).subscribe(() => {
      this.eventManager.broadcast('userInterviewListModification');
      this.activeModal.close();
    });
  }
}
