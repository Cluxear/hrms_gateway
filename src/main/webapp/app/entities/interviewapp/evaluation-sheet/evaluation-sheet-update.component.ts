import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEvaluationSheet, EvaluationSheet } from 'app/shared/model/interviewapp/evaluation-sheet.model';
import { EvaluationSheetService } from './evaluation-sheet.service';

@Component({
  selector: 'jhi-evaluation-sheet-update',
  templateUrl: './evaluation-sheet-update.component.html',
})
export class EvaluationSheetUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    atout: [],
    faibless: [],
  });

  constructor(
    protected evaluationSheetService: EvaluationSheetService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ evaluationSheet }) => {
      this.updateForm(evaluationSheet);
    });
  }

  updateForm(evaluationSheet: IEvaluationSheet): void {
    this.editForm.patchValue({
      id: evaluationSheet.id,
      atout: evaluationSheet.atout,
      faibless: evaluationSheet.faibless,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const evaluationSheet = this.createFromForm();
    if (evaluationSheet.id !== undefined) {
      this.subscribeToSaveResponse(this.evaluationSheetService.update(evaluationSheet));
    } else {
      this.subscribeToSaveResponse(this.evaluationSheetService.create(evaluationSheet));
    }
  }

  private createFromForm(): IEvaluationSheet {
    return {
      ...new EvaluationSheet(),
      id: this.editForm.get(['id'])!.value,
      atout: this.editForm.get(['atout'])!.value,
      faibless: this.editForm.get(['faibless'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEvaluationSheet>>): void {
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
