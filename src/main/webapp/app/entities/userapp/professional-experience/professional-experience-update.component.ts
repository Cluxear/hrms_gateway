import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IProfessionalExperience, ProfessionalExperience } from 'app/shared/model/userapp/professional-experience.model';
import { ProfessionalExperienceService } from './professional-experience.service';
import { ICandidate } from 'app/shared/model/userapp/candidate.model';
import { CandidateService } from 'app/entities/userapp/candidate/candidate.service';

@Component({
  selector: 'jhi-professional-experience-update',
  templateUrl: './professional-experience-update.component.html',
})
export class ProfessionalExperienceUpdateComponent implements OnInit {
  //TODO: Fix position instance fetch.
  isSaving = false;
  candidates: ICandidate[] = [];

  editForm = this.fb.group({
    id: [],
    place: [null, [Validators.required, Validators.minLength(3)]],
    positionId: [null, [Validators.required, Validators.minLength(3)]],
    description: [],
    startDate: [],
    endDate: [],
    candidateId: [],
  });

  constructor(
    protected professionalExperienceService: ProfessionalExperienceService,
    protected candidateService: CandidateService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ professionalExperience }) => {
      if (!professionalExperience.id) {
        const today = moment().startOf('day');
        professionalExperience.startDate = today;
        professionalExperience.endDate = today;
      }

      this.updateForm(professionalExperience);

      this.candidateService.query().subscribe((res: HttpResponse<ICandidate[]>) => (this.candidates = res.body || []));
    });
  }

  updateForm(professionalExperience: IProfessionalExperience): void {
    this.editForm.patchValue({
      id: professionalExperience.id,
      place: professionalExperience.place,
      post: professionalExperience.positionId,
      description: professionalExperience.description,
      startDate: professionalExperience.startDate ? professionalExperience.startDate.format(DATE_TIME_FORMAT) : null,
      endDate: professionalExperience.endDate ? professionalExperience.endDate.format(DATE_TIME_FORMAT) : null,
      candidateId: professionalExperience.candidateId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const professionalExperience = this.createFromForm();
    if (professionalExperience.id !== undefined) {
      this.subscribeToSaveResponse(this.professionalExperienceService.update(professionalExperience));
    } else {
      this.subscribeToSaveResponse(this.professionalExperienceService.create(professionalExperience));
    }
  }

  private createFromForm(): IProfessionalExperience {
    return {
      ...new ProfessionalExperience(),
      id: this.editForm.get(['id'])!.value,
      place: this.editForm.get(['place'])!.value,
      positionId: this.editForm.get(['positionId'])!.value,
      description: this.editForm.get(['description'])!.value,
      startDate: this.editForm.get(['startDate'])!.value ? moment(this.editForm.get(['startDate'])!.value, DATE_TIME_FORMAT) : undefined,
      endDate: this.editForm.get(['endDate'])!.value ? moment(this.editForm.get(['endDate'])!.value, DATE_TIME_FORMAT) : undefined,
      candidateId: this.editForm.get(['candidateId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfessionalExperience>>): void {
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
