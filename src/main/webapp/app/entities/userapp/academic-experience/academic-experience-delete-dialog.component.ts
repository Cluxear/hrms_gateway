import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAcademicExperience } from 'app/shared/model/userapp/academic-experience.model';
import { AcademicExperienceService } from './academic-experience.service';

@Component({
  templateUrl: './academic-experience-delete-dialog.component.html',
})
export class AcademicExperienceDeleteDialogComponent {
  academicExperience?: IAcademicExperience;

  constructor(
    protected academicExperienceService: AcademicExperienceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.academicExperienceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('academicExperienceListModification');
      this.activeModal.close();
    });
  }
}
