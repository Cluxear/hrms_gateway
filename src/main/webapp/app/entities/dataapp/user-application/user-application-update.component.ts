import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IUserApplication, UserApplication } from 'app/shared/model/dataapp/user-application.model';
import { UserApplicationService } from './user-application.service';

@Component({
  selector: 'jhi-user-application-update',
  templateUrl: './user-application-update.component.html',
})
export class UserApplicationUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    userId: [],
    applicationId: [],
    jobPostId: [],
  });

  constructor(
    protected userApplicationService: UserApplicationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userApplication }) => {
      this.updateForm(userApplication);
    });
  }

  updateForm(userApplication: IUserApplication): void {
    this.editForm.patchValue({
      id: userApplication.id,
      userId: userApplication.userId,
      applicationId: userApplication.applicationId,
      jobPostId: userApplication.jobPostId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userApplication = this.createFromForm();
    if (userApplication.id !== undefined) {
      this.subscribeToSaveResponse(this.userApplicationService.update(userApplication));
    } else {
      this.subscribeToSaveResponse(this.userApplicationService.create(userApplication));
    }
  }

  private createFromForm(): IUserApplication {
    return {
      ...new UserApplication(),
      id: this.editForm.get(['id'])!.value,
      userId: this.editForm.get(['userId'])!.value,
      applicationId: this.editForm.get(['applicationId'])!.value,
      jobPostId: this.editForm.get(['jobPostId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserApplication>>): void {
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
}
