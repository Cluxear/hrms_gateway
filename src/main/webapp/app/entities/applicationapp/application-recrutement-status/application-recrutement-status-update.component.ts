import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import {
  IApplicationRecrutementStatus,
  ApplicationRecrutementStatus,
} from 'app/shared/model/applicationapp/application-recrutement-status.model';
import { ApplicationRecrutementStatusService } from './application-recrutement-status.service';
import { IApplication } from 'app/shared/model/applicationapp/application.model';
import { ApplicationService } from 'app/entities/applicationapp/application/application.service';

@Component({
  selector: 'jhi-application-recrutement-status-update',
  templateUrl: './application-recrutement-status-update.component.html',
})
export class ApplicationRecrutementStatusUpdateComponent implements OnInit {
  isSaving = false;
  applications: IApplication[] = [];

  editForm = this.fb.group({
    id: [],
    addedAt: [],
    status: [],
    applicationId: [],
  });

  constructor(
    protected applicationRecrutementStatusService: ApplicationRecrutementStatusService,
    protected applicationService: ApplicationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ applicationRecrutementStatus }) => {
      if (!applicationRecrutementStatus.id) {
        const today = moment().startOf('day');
        applicationRecrutementStatus.addedAt = today;
      }

      this.updateForm(applicationRecrutementStatus);

      this.applicationService.query().subscribe((res: HttpResponse<IApplication[]>) => (this.applications = res.body || []));
    });
  }

  updateForm(applicationRecrutementStatus: IApplicationRecrutementStatus): void {
    this.editForm.patchValue({
      id: applicationRecrutementStatus.id,
      addedAt: applicationRecrutementStatus.addedAt ? applicationRecrutementStatus.addedAt.format(DATE_TIME_FORMAT) : null,
      status: applicationRecrutementStatus.status,
      applicationId: applicationRecrutementStatus.applicationId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const applicationRecrutementStatus = this.createFromForm();
    if (applicationRecrutementStatus.id !== undefined) {
      this.subscribeToSaveResponse(this.applicationRecrutementStatusService.update(applicationRecrutementStatus));
    } else {
      this.subscribeToSaveResponse(this.applicationRecrutementStatusService.create(applicationRecrutementStatus));
    }
  }

  private createFromForm(): IApplicationRecrutementStatus {
    return {
      ...new ApplicationRecrutementStatus(),
      id: this.editForm.get(['id'])!.value,
      addedAt: this.editForm.get(['addedAt'])!.value ? moment(this.editForm.get(['addedAt'])!.value, DATE_TIME_FORMAT) : undefined,
      status: this.editForm.get(['status'])!.value,
      applicationId: this.editForm.get(['applicationId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IApplicationRecrutementStatus>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IApplication): any {
    return item.id;
  }
}
