import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISeniorityLevel } from 'app/shared/model/userapp/seniority-level.model';
import { SeniorityLevelService } from './seniority-level.service';
import { SeniorityLevelDeleteDialogComponent } from './seniority-level-delete-dialog.component';

@Component({
  selector: 'jhi-seniority-level',
  templateUrl: './seniority-level.component.html',
})
export class SeniorityLevelComponent implements OnInit, OnDestroy {
  seniorityLevels?: ISeniorityLevel[];
  eventSubscriber?: Subscription;

  constructor(
    protected seniorityLevelService: SeniorityLevelService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.seniorityLevelService.query().subscribe((res: HttpResponse<ISeniorityLevel[]>) => (this.seniorityLevels = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSeniorityLevels();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISeniorityLevel): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSeniorityLevels(): void {
    this.eventSubscriber = this.eventManager.subscribe('seniorityLevelListModification', () => this.loadAll());
  }

  delete(seniorityLevel: ISeniorityLevel): void {
    const modalRef = this.modalService.open(SeniorityLevelDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.seniorityLevel = seniorityLevel;
  }
}
