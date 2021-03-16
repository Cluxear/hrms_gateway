import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IAcademicExperience, AcademicExperience } from 'app/shared/model/userapp/academic-experience.model';
import { AcademicExperienceService } from './academic-experience.service';
import { ICandidate } from 'app/shared/model/userapp/candidate.model';
import { CandidateService } from 'app/entities/userapp/candidate/candidate.service';

@Component({
  selector: 'jhi-academic-experience-update',
  templateUrl: './academic-experience-update.component.html',
})
export class AcademicExperienceUpdateComponent implements OnInit {
  isSaving = false;
  candidates: ICandidate[] = [];

  editForm = this.fb.group({
    id: [],
    place: [null, [Validators.required, Validators.minLength(3)]],
    degreeName: [null, [Validators.required, Validators.minLength(3)]],
    description: [],
    startDate: [],
    endDate: [],
    candidateId: [],
  });

  constructor(
    protected academicExperienceService: AcademicExperienceService,
    protected candidateService: CandidateService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ academicExperience }) => {
      if (!academicExperience.id) {
        const today = moment().startOf('day');
        academicExperience.startDate = today;
        academicExperience.endDate = today;
      }

      this.updateForm(academicExperience);

      this.candidateService.query().subscribe((res: HttpResponse<ICandidate[]>) => (this.candidates = res.body || []));
    });
  }

  updateForm(academicExperience: IAcademicExperience): void {
    this.editForm.patchValue({
      id: academicExperience.id,
      place: academicExperience.place,
      degreeName: academicExperience.degreeName,
      description: academicExperience.description,
      startDate: academicExperience.startDate ? academicExperience.startDate.format(DATE_TIME_FORMAT) : null,
      endDate: academicExperience.endDate ? academicExperience.endDate.format(DATE_TIME_FORMAT) : null,
      candidateId: academicExperience.candidateId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const academicExperience = this.createFromForm();
    if (academicExperience.id !== undefined) {
      this.subscribeToSaveResponse(this.academicExperienceService.update(academicExperience));
    } else {
      this.subscribeToSaveResponse(this.academicExperienceService.create(academicExperience));
    }
  }

  private createFromForm(): IAcademicExperience {
    return {
      ...new AcademicExperience(),
      id: this.editForm.get(['id'])!.value,
      place: this.editForm.get(['place'])!.value,
      degreeName: this.editForm.get(['degreeName'])!.value,
      description: this.editForm.get(['description'])!.value,
      startDate: this.editForm.get(['startDate'])!.value ? moment(this.editForm.get(['startDate'])!.value, DATE_TIME_FORMAT) : undefined,
      endDate: this.editForm.get(['endDate'])!.value ? moment(this.editForm.get(['endDate'])!.value, DATE_TIME_FORMAT) : undefined,
      candidateId: this.editForm.get(['candidateId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAcademicExperience>>): void {
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
