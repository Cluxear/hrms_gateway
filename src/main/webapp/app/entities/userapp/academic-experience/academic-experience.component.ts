import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAcademicExperience } from 'app/shared/model/userapp/academic-experience.model';
import { AcademicExperienceService } from './academic-experience.service';
import { AcademicExperienceDeleteDialogComponent } from './academic-experience-delete-dialog.component';

@Component({
  selector: 'jhi-academic-experience',
  templateUrl: './academic-experience.component.html',
})
export class AcademicExperienceComponent implements OnInit, OnDestroy {
  academicExperiences?: IAcademicExperience[];
  eventSubscriber?: Subscription;

  constructor(
    protected academicExperienceService: AcademicExperienceService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.academicExperienceService
      .query()
      .subscribe((res: HttpResponse<IAcademicExperience[]>) => (this.academicExperiences = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAcademicExperiences();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAcademicExperience): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAcademicExperiences(): void {
    this.eventSubscriber = this.eventManager.subscribe('academicExperienceListModification', () => this.loadAll());
  }

  delete(academicExperience: IAcademicExperience): void {
    const modalRef = this.modalService.open(AcademicExperienceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.academicExperience = academicExperience;
  }
}
