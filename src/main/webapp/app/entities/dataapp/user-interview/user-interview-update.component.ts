import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IUserInterview, UserInterview } from 'app/shared/model/dataapp/user-interview.model';
import { UserInterviewService } from './user-interview.service';

@Component({
  selector: 'jhi-user-interview-update',
  templateUrl: './user-interview-update.component.html',
})
export class UserInterviewUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    userId: [],
    interviewId: [],
  });

  constructor(protected userInterviewService: UserInterviewService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userInterview }) => {
      this.updateForm(userInterview);
    });
  }

  updateForm(userInterview: IUserInterview): void {
    this.editForm.patchValue({
      id: userInterview.id,
      userId: userInterview.applicationId,
      interviewId: userInterview.interviewId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userInterview = this.createFromForm();
    if (userInterview.id !== undefined) {
      this.subscribeToSaveResponse(this.userInterviewService.update(userInterview));
    } else {
      this.subscribeToSaveResponse(this.userInterviewService.create(userInterview));
    }
  }

  private createFromForm(): IUserInterview {
    return {
      ...new UserInterview(),
      id: this.editForm.get(['id'])!.value,
      applicationId: this.editForm.get(['userId'])!.value,
      interviewId: this.editForm.get(['interviewId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserInterview>>): void {
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
