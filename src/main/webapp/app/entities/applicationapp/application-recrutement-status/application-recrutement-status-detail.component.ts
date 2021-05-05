import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IApplicationRecrutementStatus } from 'app/shared/model/applicationapp/application-recrutement-status.model';

@Component({
  selector: 'jhi-application-recrutement-status-detail',
  templateUrl: './application-recrutement-status-detail.component.html',
})
export class ApplicationRecrutementStatusDetailComponent implements OnInit {
  applicationRecrutementStatus: IApplicationRecrutementStatus | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      ({ applicationRecrutementStatus }) => (this.applicationRecrutementStatus = applicationRecrutementStatus)
    );
  }

  previousState(): void {
    window.history.back();
  }
}
