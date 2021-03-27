import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IJobpost, Jobpost } from 'app/shared/model/jobposting/jobpost.model';
import { JobpostService } from './jobpost.service';
import { IDegreeLevel } from 'app/shared/model/jobposting/degree-level.model';
import { DegreeLevelService } from 'app/entities/jobposting/degree-level/degree-level.service';
import { IPosition } from 'app/shared/model/jobposting/position.model';
import { PositionService } from 'app/entities/jobposting/position/position.service';

type SelectableEntity = IDegreeLevel | IPosition;

@Component({
  selector: 'jhi-jobpost-update',
  templateUrl: './jobpost-update.component.html',
})
export class JobpostUpdateComponent implements OnInit {
  isSaving = false;
  degreelevels: IDegreeLevel[] = [];
  positons: IPosition[] = [];

  editForm = this.fb.group({
    id: [],
    title: [],
    description: [],
    estimatedSalary: [],
    type: [],
    employmentType: [],
    createdAt: [],
    modifiedAt: [],
    degreeLevelId: [],
    positonId: [],
  });

  constructor(
    protected jobpostService: JobpostService,
    protected degreeLevelService: DegreeLevelService,
    protected positionService: PositionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ jobpost }) => {
      if (!jobpost.id) {
        const today = moment().startOf('day');
        jobpost.createdAt = today;
        jobpost.modifiedAt = today;
      }

      this.updateForm(jobpost);

      this.degreeLevelService
        .query({ filter: 'jobpost-is-null' })
        .pipe(
          map((res: HttpResponse<IDegreeLevel[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IDegreeLevel[]) => {
          if (!jobpost.degreeLevelId) {
            this.degreelevels = resBody;
          } else {
            this.degreeLevelService
              .find(jobpost.degreeLevelId)
              .pipe(
                map((subRes: HttpResponse<IDegreeLevel>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IDegreeLevel[]) => (this.degreelevels = concatRes));
          }
        });

      this.positionService
        .query({ filter: 'jobpost-is-null' })
        .pipe(
          map((res: HttpResponse<IPosition[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPosition[]) => {
          if (!jobpost.positonId) {
            this.positons = resBody;
          } else {
            this.positionService
              .find(jobpost.positonId)
              .pipe(
                map((subRes: HttpResponse<IPosition>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPosition[]) => (this.positons = concatRes));
          }
        });
    });
  }

  updateForm(jobpost: IJobpost): void {
    this.editForm.patchValue({
      id: jobpost.id,
      title: jobpost.title,
      description: jobpost.description,
      estimatedSalary: jobpost.estimatedSalary,
      type: jobpost.type,
      employmentType: jobpost.employmentType,
      createdAt: jobpost.createdAt ? jobpost.createdAt.format(DATE_TIME_FORMAT) : null,
      modifiedAt: jobpost.modifiedAt ? jobpost.modifiedAt.format(DATE_TIME_FORMAT) : null,
      degreeLevelId: jobpost.degreeLevelId,
      positonId: jobpost.positonId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const jobpost = this.createFromForm();
    if (jobpost.id !== undefined) {
      this.subscribeToSaveResponse(this.jobpostService.update(jobpost));
    } else {
      this.subscribeToSaveResponse(this.jobpostService.create(jobpost));
    }
  }

  private createFromForm(): IJobpost {
    return {
      ...new Jobpost(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      description: this.editForm.get(['description'])!.value,
      estimatedSalary: this.editForm.get(['estimatedSalary'])!.value,
      type: this.editForm.get(['type'])!.value,
      employmentType: this.editForm.get(['employmentType'])!.value,
      createdAt: this.editForm.get(['createdAt'])!.value ? moment(this.editForm.get(['createdAt'])!.value, DATE_TIME_FORMAT) : undefined,
      modifiedAt: this.editForm.get(['modifiedAt'])!.value ? moment(this.editForm.get(['modifiedAt'])!.value, DATE_TIME_FORMAT) : undefined,
      degreeLevelId: this.editForm.get(['degreeLevelId'])!.value,
      positonId: this.editForm.get(['positonId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJobpost>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
