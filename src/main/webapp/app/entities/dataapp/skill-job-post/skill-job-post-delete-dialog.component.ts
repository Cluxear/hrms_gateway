import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISkillJobPost } from 'app/shared/model/dataapp/skill-job-post.model';
import { SkillJobPostService } from './skill-job-post.service';

@Component({
  templateUrl: './skill-job-post-delete-dialog.component.html',
})
export class SkillJobPostDeleteDialogComponent {
  skillJobPost?: ISkillJobPost;

  constructor(
    protected skillJobPostService: SkillJobPostService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.skillJobPostService.delete(id).subscribe(() => {
      this.eventManager.broadcast('skillJobPostListModification');
      this.activeModal.close();
    });
  }
}
