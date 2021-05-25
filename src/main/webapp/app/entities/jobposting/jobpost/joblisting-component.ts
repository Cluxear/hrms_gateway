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
import moment from "moment/moment";

@Component({
  selector: 'jhi-jobpost-listing',
  templateUrl: 'joblisting.component.html',
})
export class JoblistingComponent implements OnInit, OnDestroy {

  filter = { fullTime: false, internship: false, remote: false, presentiel:false, today: false , theseTwoDays: false };
  jobposts?: IJobpost[] = [];
  filteredJobposts? : IJobpost[] = [];
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
    this.accountService.identity().subscribe(account => {
      if (account!.authorities.includes('ROLE_CANDIDATE')) {
        this.jobpostService.findCurrentUserUnappliedForJobposts().subscribe((res: HttpResponse<IJobpost[]>) => {
          this.jobposts = res.body || [];
        });

      } else {
        this.jobpostService.query().subscribe((res: HttpResponse<IJobpost[]>) => (this.jobposts = res.body || []));
      }
    });
  }
  filterChange() : void {
    console.log(moment().dayOfYear())
    this.filteredJobposts = this.jobposts!.filter(x =>


      (  (x.employmentType!.toString() === 'FULL_TIME' && this.filter.fullTime)
      || (x.employmentType!.toString() === 'INTERNSHIP' && this.filter.internship)
       || (!this.filter.fullTime && !this.filter.internship))
      && ((x.type!.toString() === 'REMOTE' && this.filter.remote)
      || (x.type!.toString() === 'ON_SITE' && this.filter.presentiel) || (!this.filter.remote && !this.filter.presentiel))
      && (( x.createdAt!.dayOfYear() === moment().dayOfYear()  && this.filter.today)
      ||  (( x.createdAt!.dayOfYear() ===  moment().dayOfYear()  || x.createdAt!.dayOfYear() +1  ===  moment().dayOfYear())
            || (x.createdAt!.dayOfYear() + 2  ===  moment().dayOfYear() && this.filter.theseTwoDays)) || (!this.filter.theseTwoDays && !this.filter.today))
    );
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
