import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUserFileData } from 'app/shared/model/userapp/user-file-data.model';
import { UserFileDataService } from './user-file-data.service';
import { UserFileDataDeleteDialogComponent } from './user-file-data-delete-dialog.component';

@Component({
  selector: 'jhi-user-file-data',
  templateUrl: './user-file-data.component.html',
})
export class UserFileDataComponent implements OnInit, OnDestroy {
  userFileData?: IUserFileData[];
  eventSubscriber?: Subscription;

  constructor(
    protected userFileDataService: UserFileDataService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.userFileDataService.query().subscribe((res: HttpResponse<IUserFileData[]>) => (this.userFileData = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInUserFileData();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUserFileData): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUserFileData(): void {
    this.eventSubscriber = this.eventManager.subscribe('userFileDataListModification', () => this.loadAll());
  }

  delete(userFileData: IUserFileData): void {
    const modalRef = this.modalService.open(UserFileDataDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.userFileData = userFileData;
  }
}
