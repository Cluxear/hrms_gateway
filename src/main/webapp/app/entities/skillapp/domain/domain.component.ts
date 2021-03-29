import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDomain } from 'app/shared/model/skillapp/domain.model';
import { DomainService } from './domain.service';
import { DomainDeleteDialogComponent } from './domain-delete-dialog.component';

@Component({
  selector: 'jhi-domain',
  templateUrl: './domain.component.html',
})
export class DomainComponent implements OnInit, OnDestroy {
  domains?: IDomain[];
  eventSubscriber?: Subscription;

  constructor(protected domainService: DomainService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.domainService.query().subscribe((res: HttpResponse<IDomain[]>) => (this.domains = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDomains();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDomain): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDomains(): void {
    this.eventSubscriber = this.eventManager.subscribe('domainListModification', () => this.loadAll());
  }

  delete(domain: IDomain): void {
    const modalRef = this.modalService.open(DomainDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.domain = domain;
  }
}
