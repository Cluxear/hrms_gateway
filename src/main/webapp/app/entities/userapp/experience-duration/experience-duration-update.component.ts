import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IExperienceDuration, ExperienceDuration } from 'app/shared/model/userapp/experience-duration.model';
import { ExperienceDurationService } from './experience-duration.service';
import { ICandidate } from 'app/shared/model/userapp/candidate.model';
import { CandidateService } from 'app/entities/userapp/candidate/candidate.service';

@Component({
  selector: 'jhi-experience-duration-update',
  templateUrl: './experience-duration-update.component.html',
})
export class ExperienceDurationUpdateComponent implements OnInit {
  isSaving = false;
  candidates: ICandidate[] = [];

  editForm = this.fb.group({
    id: [],
    value: [],
    candidate: [],
  });

  constructor(
    protected experienceDurationService: ExperienceDurationService,
    protected candidateService: CandidateService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ experienceDuration }) => {
      this.updateForm(experienceDuration);

      this.candidateService.query().subscribe((res: HttpResponse<ICandidate[]>) => (this.candidates = res.body || []));
    });
  }

  updateForm(experienceDuration: IExperienceDuration): void {
    this.editForm.patchValue({
      id: experienceDuration.id,
      value: experienceDuration.value,
      candidate: experienceDuration.candidate,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const experienceDuration = this.createFromForm();
    if (experienceDuration.id !== undefined) {
      this.subscribeToSaveResponse(this.experienceDurationService.update(experienceDuration));
    } else {
      this.subscribeToSaveResponse(this.experienceDurationService.create(experienceDuration));
    }
  }

  private createFromForm(): IExperienceDuration {
    return {
      ...new ExperienceDuration(),
      id: this.editForm.get(['id'])!.value,
      value: this.editForm.get(['value'])!.value,
      candidate: this.editForm.get(['candidate'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExperienceDuration>>): void {
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

  trackById(index: number, item: ICandidate): any {
    return item.id;
  }
}
