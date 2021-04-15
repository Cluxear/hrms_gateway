import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';
import { Candidate, ICandidate } from 'app/shared/model/userapp/candidate.model';

@Component({
  selector: 'jhi-user-details',
  templateUrl: './userDetails.component.html',
})
export class UserDetailsComponent implements OnInit {
  candidate: ICandidate = new Candidate();
  constructor(protected activatedRoute: ActivatedRoute, protected accountService: AccountService, protected route: Router) {}

  ngOnInit(): void {
    // TODO: fetch candidate or employee based on user Role.
    this.activatedRoute.data.subscribe(({ candidate }) => {
      this.candidate = candidate;
    });
    /* this.activatedRoute.params.subscribe(params => {
      const urlParams = Object.assign({}, params);
      delete urlParams.login;
      urlParams.login = this.accountService.getLogin();
      this.route.navigate([], { relativeTo: this.activatedRoute, queryParams: urlParams });

    })
*/
  }
}
