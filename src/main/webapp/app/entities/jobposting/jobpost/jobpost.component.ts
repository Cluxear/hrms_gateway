import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IJobpost } from 'app/shared/model/jobposting/jobpost.model';
import { JobpostService } from './jobpost.service';
import { JobpostDeleteDialogComponent } from './jobpost-delete-dialog.component';
import { AccountService } from '../../../core/auth/account.service';
import { UserService } from '../../../core/user/user.service';
import { IDegreeLevel } from '../../../shared/model/jobposting/degree-level.model';
import { DegreeLevelService } from '../degree-level/degree-level.service';

@Component({
  selector: 'jhi-jobpost',
  templateUrl: './jobpost.component.html',
})
export class JobpostComponent implements OnInit, OnDestroy {
  jobposts?: IJobpost[];
  filteredJobposts?: IJobpost[];
  searchText = '';
  eventSubscriber?: Subscription;
  degreeLevel?: IDegreeLevel;
  constructor(
    protected degreeLevelService: DegreeLevelService,
    protected userService: UserService,
    protected accountService: AccountService,
    protected jobpostService: JobpostService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {

    /**  TODO: api endpoints for unappliedFor jobs candidate  **/
    this.accountService.identity().subscribe(account => {
      if (account!.authorities.includes('ROLE_sss')) {
       /* this.jobpostService.findCurrentUserUnappliedForJobposts().subscribe((res: HttpResponse<IJobpost[]>) => {
          this.jobposts = res.body || [];

        }); */
        this.jobpostService.query().subscribe((res: HttpResponse<IJobpost[]>) => (this.jobposts = res.body || []));

      } else {
        this.jobpostService.query().subscribe((res: HttpResponse<IJobpost[]>) => {
          (this.jobposts = res.body || [])
          this.filteredJobposts = this.jobposts;
        });
      }
    });
  }
  onSearchChange() : void {

    this.filteredJobposts = this.jobposts!.filter(it => {
      const searchTextLocal = this.searchText.toLocaleLowerCase();

      return it.type!.toLocaleLowerCase().includes(searchTextLocal)
        ||it.degreeLevelName!.toLocaleLowerCase().includes(searchTextLocal)
        || it.employmentType!.toLocaleLowerCase().includes(searchTextLocal)
        || it.title!.toLocaleLowerCase().includes(searchTextLocal)
        || it.positionName!.toLocaleLowerCase().includes(searchTextLocal);

    });
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
