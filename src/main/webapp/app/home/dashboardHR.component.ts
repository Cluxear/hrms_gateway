import { Component, OnInit } from '@angular/core';
import { AccountService } from '../core/auth/account.service';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../entities/applicationapp/application/application.service';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../core/user/user.service';
import { IUser } from '../core/user/user.model';
import {Application, IApplication} from "app/shared/model/applicationapp/application.model";
import {IAddress} from "app/shared/model/userapp/address.model";
import {IDegreeLevel} from "app/shared/model/userapp/degree-level.model";
import {ISeniorityLevel} from "app/shared/model/userapp/seniority-level.model";
import {ISkill} from "app/shared/model/skillapp/skill.model";
import {IPosition} from "app/shared/model/userapp/position.model";
import {IExperienceDuration} from "app/shared/model/userapp/experience-duration.model";
import moment from "moment/moment";

type SelectableEntity = string;

@Component({
  selector: 'jhi-dashboard',
  templateUrl: './dashboardHR.component.html',
})
export class DashboardHRComponent implements OnInit {
  user?: IUser;
  candidates?: Application[];
  originalCandidates?: Application[];
  predicate: string;
  ascending: boolean;
  monthsArray? = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  constructor(private applicationService: ApplicationService, protected accountService: AccountService, protected userService: UserService, protected activatedRoute: ActivatedRoute) {
    this.predicate = 'id';
    this.ascending = true;
  }
  ngOnInit(): void {
    this.applicationService.query().subscribe(res =>{
        this.candidates = res.body! || [];
        this.originalCandidates = this.candidates;
        this.candidates = this.originalCandidates?.filter(a => {
          return  a.creationDate!.month().toString() === moment().month().toString();
        } );
    }
    );


    this.userService.findByLogin(this.accountService.getLogin()).subscribe(result => (this.user = result.body!));
    /** Filter application list : show only current month on init  **/


    // the elements of the array
  }

  reset(): void {
 //   this.page = 0;
    this.candidates = [];
   // this.loadAll();
  }
  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  trackId(index: number, item: IApplication): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  isCurrentMonth() : number {

    return moment().month();


  }

  filterCandidates(event: string) : void {
    this.candidates = this.originalCandidates?.filter(a => {
     return  a.creationDate!.month().toString() === event;
    } );
  }
}
