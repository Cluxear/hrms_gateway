import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IEmployee, Employee } from 'app/shared/model/userapp/employee.model';
import { EmployeeService } from './employee.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IPosition } from 'app/shared/model/userapp/position.model';
import { PositionService } from 'app/entities/userapp/position/position.service';
import { IDegreeLevel } from 'app/shared/model/userapp/degree-level.model';
import { DegreeLevelService } from 'app/entities/userapp/degree-level/degree-level.service';
import { ISeniorityLevel } from 'app/shared/model/userapp/seniority-level.model';
import { SeniorityLevelService } from 'app/entities/userapp/seniority-level/seniority-level.service';
import {IManagedUser, ManagedUser} from "../../../core/user/managedUser.model";
import {Authority} from "../../../shared/constants/authority.constants";

type SelectableEntity = IUser | IPosition | IDegreeLevel | ISeniorityLevel;

@Component({
  selector: 'jhi-employee-update',
  templateUrl: './employee-update.component.html',
})
export class EmployeeUpdateComponent implements OnInit {

  /** TODO: Changing account info for already existing accounts **/
  isSaving = false;
  isUpdate = false;
  users: IUser[] = [];
  positions: IPosition[] = [];
  degreelevels: IDegreeLevel[] = [];
  senioritylevels: ISeniorityLevel[] = [];
  loading = false;
  submitted = false;

  editForm = this.fb.group({
    id: [],
    salary: [],
    login:[],
    firstName: [],
    lastName: [],
    email : [],
    password: [],
    positionId: [],
    degreeId: [],

    seniorityLevelId: [],
  });

  constructor(
    protected employeeService: EmployeeService,
    protected userService: UserService,
    protected positionService: PositionService,
    protected degreeLevelService: DegreeLevelService,
    protected seniorityLevelService: SeniorityLevelService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employee }) => {
      if(employee.id)
          this.isUpdate = true;
      this.updateForm(employee);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.positionService
        .query({ filter: 'employee-is-null' })
        .pipe(
          map((res: HttpResponse<IPosition[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPosition[]) => {
          if (!employee.positionId) {
            this.positions = resBody;
          } else {
            this.positionService
              .find(employee.positionId)
              .pipe(
                map((subRes: HttpResponse<IPosition>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPosition[]) => (this.positions = concatRes));
          }
        });

      this.degreeLevelService.query().subscribe((res: HttpResponse<IDegreeLevel[]>) => (this.degreelevels = res.body || []));

      this.seniorityLevelService.query().subscribe((res: HttpResponse<ISeniorityLevel[]>) => (this.senioritylevels = res.body || []));
    });
  }

  updateForm(employee: IEmployee): void {
    this.editForm.patchValue({
      id: employee.id,
      salary: employee.salary,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phone: employee.phone,
      login: employee.login,
      userId: employee.userId,
      positionId: employee.positionId,
      degreeId: employee.degreeId,
      seniorityLevelId: employee.seniorityLevelId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const employee = this.createFromForm();
    if (employee.id !== undefined) {
      this.subscribeToSaveResponse(this.employeeService.update(employee));
    } else {
      console.log("In save");
      this.subscribeToSaveResponse(this.userService.register(employee));
    }
  }

  private createFromForm(): IManagedUser {
    return {
      ...new ManagedUser(),
      id: this.editForm.get(['id'])!.value,
      userId: this.editForm.get(['id'])!.value,
      salary: this.editForm.get(['salary'])!.value,

      positionId: this.editForm.get(['positionId'])!.value,
      degreeId: this.editForm.get(['degreeId'])!.value,
      seniorityLevelId: this.editForm.get(['seniorityLevelId'])!.value,
      password : this.editForm.get(['password'])?.value,
      email: this.editForm.get(['email'])?.value,
      login: this.editForm.get(['login'])?.value,
      firstName: this.editForm.get(['firstName'])?.value,
      lastName: this.editForm.get(['lastName'])?.value,
      authorities: [Authority.EMPLOYEE, Authority.USER],
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployee>>): void {
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
