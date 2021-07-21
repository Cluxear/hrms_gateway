import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserFileData } from 'app/shared/model/userapp/user-file-data.model';

@Component({
  selector: 'jhi-user-file-data-detail',
  templateUrl: './user-file-data-detail.component.html',
})
export class UserFileDataDetailComponent implements OnInit {
  userFileData: IUserFileData | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userFileData }) => (this.userFileData = userFileData));
  }

  previousState(): void {
    window.history.back();
  }
}
