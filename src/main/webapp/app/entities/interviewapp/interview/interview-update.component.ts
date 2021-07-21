import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IInterview, Interview } from 'app/shared/model/interviewapp/interview.model';
import { InterviewService } from './interview.service';
import { IEvaluationSheet } from 'app/shared/model/interviewapp/evaluation-sheet.model';
import { EvaluationSheetService } from 'app/entities/interviewapp/evaluation-sheet/evaluation-sheet.service';
import {IUserInterview, UserInterview} from "../../../shared/model/dataapp/user-interview.model";
import {EmployeeService} from "../../userapp/employee/employee.service";
import {IEmployee} from "../../../shared/model/userapp/employee.model";
import {UserInterviewService} from "../../dataapp/user-interview/user-interview.service";

type SelectableEntity = IEvaluationSheet | IEmployee;
@Component({
  selector: 'jhi-interview-update',
  templateUrl: './interview-update.component.html',
})
export class InterviewUpdateComponent implements OnInit {
  isSaving = false;
  evaluationsheets: IEvaluationSheet[] = [];
  applicationId? : number;
  employeesList: IEmployee[] = [];
  recruterId?: string;
  _userInterview?: IUserInterview;
  interview?: IInterview;
  editForm = this.fb.group({
    id: [],
    interviewDate: [],
    recruterId: String,
    createdAt: [],
    modifiedAt: [],
    resultAttributedAt: [],
    type: [],
    result: [],
    isDateFixed: [],
    note: [],
    evaluationSheetId: [],
  });

  constructor(
    protected interviewService: InterviewService,
    protected evaluationSheetService: EvaluationSheetService,
    protected employeeService: EmployeeService,
    protected applicationInterviewService: UserInterviewService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(params => this.applicationId = params.applicationId);
    this.activatedRoute.data.subscribe(({ interview }) => {
      if (!interview.id) {
        const today = moment().startOf('day');
        interview.interviewDate = today;
        interview.createdAt = today;
        interview.modifiedAt = today;
        interview.resultAttributedAt = today;
      }

      this.updateForm(interview);

      this.evaluationSheetService
        .query({ filter: 'interview-is-null' })
        .pipe(
          map((res: HttpResponse<IEvaluationSheet[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IEvaluationSheet[]) => {
          if (!interview.evaluationSheetId) {
            this.evaluationsheets = resBody;
          } else {
            this.evaluationSheetService
              .find(interview.evaluationSheetId)
              .pipe(
                map((subRes: HttpResponse<IEvaluationSheet>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IEvaluationSheet[]) => (this.evaluationsheets = concatRes));
          }
        });
      this.employeeService.query().subscribe((data) => {
        this.employeesList = data.body || [];
        // TODO: update form with associated recruter Id on init
        if(this.applicationId !== undefined && interview.id !== undefined  ) {
          this.applicationInterviewService.findByInterviewId(interview.id).subscribe((next) => {
            console.log("ID HEREEE"+ next.body!.id + next.body!.recruterId);
            this._userInterview = next.body!;
            this.recruterId = next.body!.recruterId;
          })
        }

      })
    });

  }

  updateForm(interview: IInterview): void {
    this.editForm.patchValue({
      id: interview.id,
      interviewDate: interview.interviewDate ? interview.interviewDate.format(DATE_TIME_FORMAT) : null,
      createdAt: interview.createdAt ? interview.createdAt.format(DATE_TIME_FORMAT) : null,
      modifiedAt: interview.modifiedAt ? interview.modifiedAt.format(DATE_TIME_FORMAT) : null,
      resultAttributedAt: interview.resultAttributedAt ? interview.resultAttributedAt.format(DATE_TIME_FORMAT) : null,
      type: interview.type,
      result: interview.result,
      isDateFixed: interview.isDateFixed,
      note: interview.note,
      evaluationSheetId: interview.evaluationSheetId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
     this.interview = this.createFromForm();
    if (this.interview.id !== undefined) {
      this.subscribeToSaveResponse(this.interviewService.update(this.interview));
    } else {
      this.subscribeToSaveResponse(this.interviewService.create(this.interview));

    }
  }

  private createFromForm(): IInterview {
    return {
      ...new Interview(),
      id: this.editForm.get(['id'])!.value,
      interviewDate: this.editForm.get(['interviewDate'])!.value
        ? moment(this.editForm.get(['interviewDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      createdAt: moment(DATE_TIME_FORMAT),
      modifiedAt: moment(DATE_TIME_FORMAT),
      resultAttributedAt: this.editForm.get(['resultAttributedAt'])!.value
        ? moment(this.editForm.get(['resultAttributedAt'])!.value, DATE_TIME_FORMAT)
        : undefined,
      type: this.editForm.get(['type'])!.value,
      recruterId : this.editForm.get(['recruterId'])!.value,
      result: this.editForm.get(['result'])!.value,
      isDateFixed:this.editForm.get(['interviewDate'])!.value !== undefined,
      note: this.editForm.get(['note'])!.value,

    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInterview>>): void {
    result.subscribe(
      (data) => {

         if(this.applicationId !== undefined)
             this.createOrUpdateUserInterview(data.body!);
         else {
           this.onSaveSuccess();
         }
      },
      () => this.onSaveError()
    );
  }
  protected createOrUpdateUserInterview(interview: IInterview) : void {

       const userInterview : IUserInterview = new UserInterview();
       userInterview.interviewId = interview.id;
       userInterview.applicationId = this.applicationId;
       userInterview.recruterId = this.interview!.recruterId;

       if(this._userInterview === undefined)
           this.applicationInterviewService.create(userInterview).subscribe((next)=> this.onSaveSuccess(), (err) => this.onSaveError());
       else {
         userInterview.id = this._userInterview.id;
         this.applicationInterviewService.update(userInterview).subscribe((next)=> this.onSaveSuccess(), (err) => this.onSaveError());

       }
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
