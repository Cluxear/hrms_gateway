import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IUserFileData, UserFileData } from 'app/shared/model/userapp/user-file-data.model';
import { UserFileDataService } from './user-file-data.service';

@Component({
  selector: 'jhi-user-file-data-update',
  templateUrl: './user-file-data-update.component.html',
})
export class UserFileDataUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    filename: [null, [Validators.required, Validators.minLength(3)]],
    url: [null, [Validators.required, Validators.minLength(3)]],
    size: [],
  });

  constructor(protected userFileDataService: UserFileDataService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userFileData }) => {
      this.updateForm(userFileData);
    });
  }

  updateForm(userFileData: IUserFileData): void {
    this.editForm.patchValue({
      id: userFileData.id,
      filename: userFileData.filename,
      url: userFileData.url,
      size: userFileData.size,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userFileData = this.createFromForm();
    if (userFileData.id !== undefined) {
      this.subscribeToSaveResponse(this.userFileDataService.update(userFileData));
    } else {
      this.subscribeToSaveResponse(this.userFileDataService.create(userFileData));
    }
  }

  private createFromForm(): IUserFileData {
    return {
      ...new UserFileData(),
      id: this.editForm.get(['id'])!.value,
      filename: this.editForm.get(['filename'])!.value,
      url: this.editForm.get(['url'])!.value,
      size: this.editForm.get(['size'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserFileData>>): void {
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
