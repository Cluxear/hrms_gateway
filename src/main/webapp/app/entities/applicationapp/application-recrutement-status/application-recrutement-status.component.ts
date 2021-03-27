import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IApplicationRecrutementStatus } from 'app/shared/model/applicationapp/application-recrutement-status.model';
import { ApplicationRecrutementStatusService } from './application-recrutement-status.service';
import { ApplicationRecrutementStatusDeleteDialogComponent } from './application-recrutement-status-delete-dialog.component';

@Component({
  selector: 'jhi-application-recrutement-status',
  templateUrl: './application-recrutement-status.component.html',
})
export class ApplicationRecrutementStatusComponent implements OnInit, OnDestroy {
  applicationRecrutementStatuses?: IApplicationRecrutementStatus[];
  eventSubscriber?: Subscription;

  constructor(
    protected applicationRecrutementStatusService: ApplicationRecrutementStatusService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.applicationRecrutementStatusService
      .query()
      .subscribe((res: HttpResponse<IApplicationRecrutementStatus[]>) => (this.applicationRecrutementStatuses = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInApplicationRecrutementStatuses();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IApplicationRecrutementStatus): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInApplicationRecrutementStatuses(): void {
    this.eventSubscriber = this.eventManager.subscribe('applicationRecrutementStatusListModification', () => this.loadAll());
  }

  delete(applicationRecrutementStatus: IApplicationRecrutementStatus): void {
    const modalRef = this.modalService.open(ApplicationRecrutementStatusDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.applicationRecrutementStatus = applicationRecrutementStatus;
  }
}
