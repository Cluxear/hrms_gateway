import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {JhiEventManager} from 'ng-jhipster';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {IApplication} from 'app/shared/model/applicationapp/application.model';
import {ApplicationService} from './application.service';
import {AccountService} from '../../../core/auth/account.service';
import {JobpostService} from '../../jobposting/jobpost/jobpost.service';
import {UserService} from '../../../core/user/user.service';
import {ActivatedRoute} from '@angular/router';
import {IJobpost} from "../../../shared/model/jobposting/jobpost.model";
import {ConclusionType} from "../../../shared/model/enumerations/conclusion-type.model";
import {UserApplicationService} from "../../dataapp/user-application/user-application.service";

@Component({
  selector: 'jhi-application',
  templateUrl: './application.component.html',
})
export class ApplicationComponent implements OnInit, OnDestroy {
  filter = { preselected : false};
  applications?: IApplication[] = [];
  filteredApplications? : IApplication[] = [];

  jobpostInQuestion?: IJobpost;
  eventSubscriber?: Subscription;
  searchText?: string;

  constructor(
    protected applicationService: ApplicationService,
    protected userApplicationService: UserApplicationService,
    protected accountService: AccountService,
    protected jobPostService: JobpostService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  loadAll(): void {
    const login = this.accountService.getLogin();
    this.accountService.identity().subscribe(account => {
      if (account!.authorities.includes('ROLE_CANDIDATE')) {
        this.applicationService
          .findAll(login)
          .subscribe((res: HttpResponse<IApplication[]>) => {
            (this.applications = res.body || [])
            this.filteredApplications = this.applications;

          });
      }
      if( account!.authorities.includes('ROLE_ADMIN')) {
        this.applicationService.query().subscribe((res: HttpResponse<IApplication[]>) => {
          this.applications = res.body || [];
          this.filteredApplications = this.applications;


        })
      }
      this.activatedRoute.params.subscribe(param => {
        if (param.jpid) {
          this.jobPostService.find(param.jpid).subscribe((jp) => (this.jobpostInQuestion = jp.body!))
          if (account!.authorities.includes('ROLE_ADMIN')) {
            this.applicationService
              .findByJobPost(param.jpid)
              .subscribe((res: HttpResponse<IApplication[]>) => {
                (this.applications = res.body || [])
                this.filteredApplications = this.applications;

              });


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

  addPreselected(app: IApplication) : void {


    app.shortListed = !app.shortListed;
    this.applicationService.update(app).subscribe(next => (this.registerChangeInApplications()));

  }
  registerChangeInApplications(): void {

    this.eventSubscriber = this.eventManager.subscribe('applicationListModification', () => this.loadAll());
  }

  delete(id: number): void {

    this.userApplicationService.deleteByApplicationId(id).subscribe((next) => {
      this.applicationService.delete(id).subscribe((val) => {
        this.loadAll();
        this.registerChangeInApplications();

      })
    })

  }
  reject(application : IApplication) : void {

    // TODO : reject application
    application.conclusion = ConclusionType.REJECTED;
    this.applicationService.update(application).subscribe(()=> {
      this.loadAll();
      this.registerChangeInApplications();
    })
  }

  accept(application: IApplication) : void {
    application.conclusion = ConclusionType.HIRED;
    this.applicationService.update(application).subscribe((next)=> {
      this.registerChangeInApplications();
    })
    application.position = this.jobpostInQuestion?.positonId;

    this.userService.recruteCandidate(application).subscribe((next)=> {
      console.log(" Recruted");
    });
    // Promote candidate to Employee Role.


  }
  filterChange() : void {
    this.filteredApplications = this.applications!.filter(x => {
      return x.shortListed && this.filter.preselected
    })
    if(!this.filter.preselected) this.filteredApplications = this.applications;
  }


  onSearchChange() :void {

  }
}
