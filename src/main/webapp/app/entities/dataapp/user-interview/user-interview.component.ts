import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUserInterview } from 'app/shared/model/dataapp/user-interview.model';
import { UserInterviewService } from './user-interview.service';
import { UserInterviewDeleteDialogComponent } from './user-interview-delete-dialog.component';

@Component({
  selector: 'jhi-user-interview',
  templateUrl: './user-interview.component.html',
})
export class UserInterviewComponent implements OnInit, OnDestroy {
  userInterviews?: IUserInterview[];
  eventSubscriber?: Subscription;

  constructor(
    protected userInterviewService: UserInterviewService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.userInterviewService.query().subscribe((res: HttpResponse<IUserInterview[]>) => (this.userInterviews = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInUserInterviews();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUserInterview): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUserInterviews(): void {
    this.eventSubscriber = this.eventManager.subscribe('userInterviewListModification', () => this.loadAll());
  }

  delete(userInterview: IUserInterview): void {
    const modalRef = this.modalService.open(UserInterviewDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.userInterview = userInterview;
  }
}
