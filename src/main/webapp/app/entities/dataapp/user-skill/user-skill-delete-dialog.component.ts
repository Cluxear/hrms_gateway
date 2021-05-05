import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserSkill } from 'app/shared/model/dataapp/user-skill.model';
import { UserSkillService } from './user-skill.service';

@Component({
  templateUrl: './user-skill-delete-dialog.component.html',
})
export class UserSkillDeleteDialogComponent {
  userSkill?: IUserSkill;

  constructor(protected userSkillService: UserSkillService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.userSkillService.delete(id).subscribe(() => {
      this.eventManager.broadcast('userSkillListModification');
      this.activeModal.close();
    });
  }
}
