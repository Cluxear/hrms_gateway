import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IExperienceDuration } from 'app/shared/model/userapp/experience-duration.model';
import { ExperienceDurationService } from './experience-duration.service';
import { ExperienceDurationDeleteDialogComponent } from './experience-duration-delete-dialog.component';

@Component({
  selector: 'jhi-experience-duration',
  templateUrl: './experience-duration.component.html',
})
export class ExperienceDurationComponent implements OnInit, OnDestroy {
  experienceDurations?: IExperienceDuration[];
  eventSubscriber?: Subscription;

  constructor(
    protected experienceDurationService: ExperienceDurationService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.experienceDurationService
      .query()
      .subscribe((res: HttpResponse<IExperienceDuration[]>) => (this.experienceDurations = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInExperienceDurations();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IExperienceDuration): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInExperienceDurations(): void {
    this.eventSubscriber = this.eventManager.subscribe('experienceDurationListModification', () => this.loadAll());
  }

  delete(experienceDuration: IExperienceDuration): void {
    const modalRef = this.modalService.open(ExperienceDurationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.experienceDuration = experienceDuration;
  }
}
