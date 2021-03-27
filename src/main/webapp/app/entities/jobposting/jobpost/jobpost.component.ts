import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IJobpost } from 'app/shared/model/jobposting/jobpost.model';
import { JobpostService } from './jobpost.service';
import { JobpostDeleteDialogComponent } from './jobpost-delete-dialog.component';

@Component({
  selector: 'jhi-jobpost',
  templateUrl: './jobpost.component.html',
})
export class JobpostComponent implements OnInit, OnDestroy {
  jobposts?: IJobpost[];
  eventSubscriber?: Subscription;

  constructor(protected jobpostService: JobpostService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.jobpostService.query().subscribe((res: HttpResponse<IJobpost[]>) => (this.jobposts = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInJobposts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IJobpost): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInJobposts(): void {
    this.eventSubscriber = this.eventManager.subscribe('jobpostListModification', () => this.loadAll());
  }

  delete(jobpost: IJobpost): void {
    const modalRef = this.modalService.open(JobpostDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.jobpost = jobpost;
  }
}
