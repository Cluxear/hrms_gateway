import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDegreeLevel } from 'app/shared/model/userapp/degree-level.model';
import { DegreeLevelService } from './degree-level.service';
import { DegreeLevelDeleteDialogComponent } from './degree-level-delete-dialog.component';

@Component({
  selector: 'jhi-degree-level',
  templateUrl: './degree-level.component.html',
})
export class DegreeLevelComponent implements OnInit, OnDestroy {
  degreeLevels?: IDegreeLevel[];
  eventSubscriber?: Subscription;

  constructor(
    protected degreeLevelService: DegreeLevelService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.degreeLevelService.query().subscribe((res: HttpResponse<IDegreeLevel[]>) => (this.degreeLevels = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDegreeLevels();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDegreeLevel): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDegreeLevels(): void {
    this.eventSubscriber = this.eventManager.subscribe('degreeLevelListModification', () => this.loadAll());
  }

  delete(degreeLevel: IDegreeLevel): void {
    const modalRef = this.modalService.open(DegreeLevelDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.degreeLevel = degreeLevel;
  }
}
