import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core/auth/account.service';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from 'app/entities/applicationapp/application/application.service';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'app/core/user/user.service';
import { IUser } from 'app/core/user/user.model';

@Component({
  selector: 'jhi-dashboard',
  templateUrl: './dashboardHR.component.html',
})
export class DashboardHRComponent implements OnInit {
  user?: IUser;
  constructor(protected accountService: AccountService, protected userService: UserService, protected activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.userService.findByLogin(this.accountService.getLogin()).subscribe(result => (this.user = result.body!));
  }
}
