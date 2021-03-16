import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICertification, Certification } from 'app/shared/model/userapp/certification.model';
import { CertificationService } from './certification.service';
import { ICandidate } from 'app/shared/model/userapp/candidate.model';
import { CandidateService } from 'app/entities/userapp/candidate/candidate.service';

@Component({
  selector: 'jhi-certification-update',
  templateUrl: './certification-update.component.html',
})
export class CertificationUpdateComponent implements OnInit {
  isSaving = false;
  candidates: ICandidate[] = [];

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required, Validators.minLength(3)]],
    description: [],
    candidateId: [],
  });

  constructor(
    protected certificationService: CertificationService,
    protected candidateService: CandidateService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ certification }) => {
      this.updateForm(certification);

      this.candidateService.query().subscribe((res: HttpResponse<ICandidate[]>) => (this.candidates = res.body || []));
    });
  }

  updateForm(certification: ICertification): void {
    this.editForm.patchValue({
      id: certification.id,
      title: certification.title,
      description: certification.description,
      candidateId: certification.candidateId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const certification = this.createFromForm();
    if (certification.id !== undefined) {
      this.subscribeToSaveResponse(this.certificationService.update(certification));
    } else {
      this.subscribeToSaveResponse(this.certificationService.create(certification));
    }
  }

  private createFromForm(): ICertification {
    return {
      ...new Certification(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      description: this.editForm.get(['description'])!.value,
      candidateId: this.editForm.get(['candidateId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICertification>>): void {
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
