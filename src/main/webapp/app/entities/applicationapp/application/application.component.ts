import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IApplication } from 'app/shared/model/applicationapp/application.model';
import { ApplicationService } from './application.service';
import { ApplicationDeleteDialogComponent } from './application-delete-dialog.component';
import { ICandidate } from '../../../shared/model/userapp/candidate.model';
import { ISkill } from '../../../shared/model/skillapp/skill.model';
import { AccountService } from '../../../core/auth/account.service';
import { JobpostService } from '../../jobposting/jobpost/jobpost.service';
import { UserService } from '../../../core/user/user.service';
import { ActivatedRoute } from '@angular/router';
import {IJobpost} from "../../../shared/model/jobposting/jobpost.model";

@Component({
  selector: 'jhi-application',
  templateUrl: './application.component.html',
})
export class ApplicationComponent implements OnInit, OnDestroy {
  applications?: IApplication[];
  jobpostInQuestion?: IJobpost;
  eventSubscriber?: Subscription;

  constructor(
    protected applicationService: ApplicationService,
    protected accountService: AccountService,
    protected jobPostService: JobpostService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute
  ) {}

  loadAll(): void {
    const login = this.accountService.getLogin();
    this.accountService.identity().subscribe(account => {
      if (account!.authorities.includes('ROLE_USER')) {
        this.applicationService.findAll(login).subscribe((res: HttpResponse<IApplication[]>) => (this.applications = res.body || []));
      }
      this.activatedRoute.params.subscribe(param => {
        if (param.jpid) {
          this.jobPostService.find(param.jpid).subscribe((jp) => (this.jobpostInQuestion = jp.body!))
          if (account!.authorities.includes('ROLE_ADMIN')) {
            this.applicationService
              .findByJobPost(param.jpid)
              .subscribe((res: HttpResponse<IApplication[]>) => (this.applications = res.body || []));


          }
        }
      });
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInApplications();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IApplication): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInApplications(): void {
    this.eventSubscriber = this.eventManager.subscribe('applicationListModification', () => this.loadAll());
  }

  delete(application: IApplication): void {
    const modalRef = this.modalService.open(ApplicationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.application = application;
  }
}
