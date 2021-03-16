import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISeniorityLevel, SeniorityLevel } from 'app/shared/model/userapp/seniority-level.model';
import { SeniorityLevelService } from './seniority-level.service';

@Component({
  selector: 'jhi-seniority-level-update',
  templateUrl: './seniority-level-update.component.html',
})
export class SeniorityLevelUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.minLength(3)]],
  });

  constructor(protected seniorityLevelService: SeniorityLevelService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ seniorityLevel }) => {
      this.updateForm(seniorityLevel);
    });
  }

  updateForm(seniorityLevel: ISeniorityLevel): void {
    this.editForm.patchValue({
      id: seniorityLevel.id,
      name: seniorityLevel.name,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const seniorityLevel = this.createFromForm();
    if (seniorityLevel.id !== undefined) {
      this.subscribeToSaveResponse(this.seniorityLevelService.update(seniorityLevel));
    } else {
      this.subscribeToSaveResponse(this.seniorityLevelService.create(seniorityLevel));
    }
  }

  private createFromForm(): ISeniorityLevel {
    return {
      ...new SeniorityLevel(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISeniorityLevel>>): void {
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
