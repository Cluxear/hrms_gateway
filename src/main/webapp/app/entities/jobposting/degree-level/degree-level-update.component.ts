import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDegreeLevel, DegreeLevel } from 'app/shared/model/jobposting/degree-level.model';
import { DegreeLevelService } from './degree-level.service';

@Component({
  selector: 'jhi-degree-level-update',
  templateUrl: './degree-level-update.component.html',
})
export class DegreeLevelUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
  });

  constructor(protected degreeLevelService: DegreeLevelService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ degreeLevel }) => {
      this.updateForm(degreeLevel);
    });
  }

  updateForm(degreeLevel: IDegreeLevel): void {
    this.editForm.patchValue({
      id: degreeLevel.id,
      name: degreeLevel.name,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const degreeLevel = this.createFromForm();
    if (degreeLevel.id !== undefined) {
      this.subscribeToSaveResponse(this.degreeLevelService.update(degreeLevel));
    } else {
      this.subscribeToSaveResponse(this.degreeLevelService.create(degreeLevel));
    }
  }

  private createFromForm(): IDegreeLevel {
    return {
      ...new DegreeLevel(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDegreeLevel>>): void {
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
