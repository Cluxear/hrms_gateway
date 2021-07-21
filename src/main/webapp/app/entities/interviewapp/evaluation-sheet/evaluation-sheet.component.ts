import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEvaluationSheet } from 'app/shared/model/interviewapp/evaluation-sheet.model';
import { EvaluationSheetService } from './evaluation-sheet.service';
import { EvaluationSheetDeleteDialogComponent } from './evaluation-sheet-delete-dialog.component';

@Component({
  selector: 'jhi-evaluation-sheet',
  templateUrl: './evaluation-sheet.component.html',
})
export class EvaluationSheetComponent implements OnInit, OnDestroy {
  evaluationSheets?: IEvaluationSheet[];
  eventSubscriber?: Subscription;

  constructor(
    protected evaluationSheetService: EvaluationSheetService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.evaluationSheetService.query().subscribe((res: HttpResponse<IEvaluationSheet[]>) => (this.evaluationSheets = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEvaluationSheets();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEvaluationSheet): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEvaluationSheets(): void {
    this.eventSubscriber = this.eventManager.subscribe('evaluationSheetListModification', () => this.loadAll());
  }

  delete(evaluationSheet: IEvaluationSheet): void {
    const modalRef = this.modalService.open(EvaluationSheetDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.evaluationSheet = evaluationSheet;
  }
}
