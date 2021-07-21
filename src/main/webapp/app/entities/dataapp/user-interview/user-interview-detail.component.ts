import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserInterview } from 'app/shared/model/dataapp/user-interview.model';

@Component({
  selector: 'jhi-user-interview-detail',
  templateUrl: './user-interview-detail.component.html',
})
export class UserInterviewDetailComponent implements OnInit {
  userInterview: IUserInterview | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userInterview }) => (this.userInterview = userInterview));
  }

  previousState(): void {
    window.history.back();
  }
}
