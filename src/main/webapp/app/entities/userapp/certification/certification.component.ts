import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICertification } from 'app/shared/model/userapp/certification.model';
import { CertificationService } from './certification.service';
import { CertificationDeleteDialogComponent } from './certification-delete-dialog.component';

@Component({
  selector: 'jhi-certification',
  templateUrl: './certification.component.html',
})
export class CertificationComponent implements OnInit, OnDestroy {
  certifications?: ICertification[];
  eventSubscriber?: Subscription;

  constructor(
    protected certificationService: CertificationService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.certificationService.query().subscribe((res: HttpResponse<ICertification[]>) => (this.certifications = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCertifications();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICertification): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCertifications(): void {
    this.eventSubscriber = this.eventManager.subscribe('certificationListModification', () => this.loadAll());
  }

  delete(certification: ICertification): void {
    const modalRef = this.modalService.open(CertificationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.certification = certification;
  }
}
