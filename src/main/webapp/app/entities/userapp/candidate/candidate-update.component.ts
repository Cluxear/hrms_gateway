import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICandidate, Candidate } from 'app/shared/model/userapp/candidate.model';
import { CandidateService } from './candidate.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IAddress, Address } from 'app/shared/model/userapp/address.model';
import { AddressService } from 'app/entities/userapp/address/address.service';
import { IDegreeLevel } from 'app/shared/model/userapp/degree-level.model';
import { DegreeLevelService } from 'app/entities/userapp/degree-level/degree-level.service';
import { ISeniorityLevel } from 'app/shared/model/userapp/seniority-level.model';
import { SeniorityLevelService } from 'app/entities/userapp/seniority-level/seniority-level.service';
import { IProfessionalExperience } from 'app/shared/model/userapp/professional-experience.model';
import { IAcademicExperience } from 'app/shared/model/userapp/academic-experience.model';
import { ICertification } from 'app/shared/model/userapp/certification.model';
import { ICountry } from 'app/shared/model/userapp/country.model';
import { AcademicExperienceService } from '../academic-experience/academic-experience.service';
import { ProfessionalExperienceService } from '../professional-experience/professional-experience.service';
import { CertificationService } from '../certification/certification.service';
import { CountryService } from '../country/country.service';

type SelectableEntity = IUser | IAddress | IDegreeLevel | ISeniorityLevel;

@Component({
  selector: 'jhi-candidate-update',
  templateUrl: './candidate-update.component.html',
})
export class CandidateUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  address: IAddress = new Address();
  degreelevels: IDegreeLevel[] = [];
  senioritylevels: ISeniorityLevel[] = [];
  professionalExperiences: IProfessionalExperience[] = [];
  academicExperiences: IAcademicExperience[] = [];
  certifications: ICertification[] = [];
  country: ICountry[] = [];

  editForm = this.fb.group({
    id: [],
    personalStatement: [],
    phone: [],
    street: String,
    postalCode: Number,
    city: String,
    state: String,
    userId: [],
    address: [],
    degreeLevel: [],
    seniorityLevel: [],
    professionalExperiences: [],
    academicExperiences: [],
    certifications: [],
    country: [],
  });

  constructor(
    protected candidateService: CandidateService,
    protected userService: UserService,
    protected addressService: AddressService,
    protected degreeLevelService: DegreeLevelService,
    protected seniorityLevelService: SeniorityLevelService,
    protected academicExperienceService: AcademicExperienceService,
    protected professionalExperienceService: ProfessionalExperienceService,
    protected certificationService: CertificationService,
    protected countryService: CountryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ candidate }) => {
      this.updateForm(candidate);

      /*    this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.addressService
        .query({ filter: 'candidate-is-null' })
        .pipe(
          map((res: HttpResponse<IAddress[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IAddress[]) => {
          if (!candidate.addressId) {
         //   this.address = resBody;
          } else {
            this.addressService
              .find(candidate.addressId)
              .pipe(
                map((subRes: HttpResponse<IAddress>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IAddress[]) => (this.address = concatRes));
          }
        });

      this.degreeLevelService.query().subscribe((res: HttpResponse<IDegreeLevel[]>) => (this.degreelevels = res.body || []));

      this.seniorityLevelService.query().subscribe((res: HttpResponse<ISeniorityLevel[]>) => (this.senioritylevels = res.body || []));
      */
    });
  }

  updateForm(candidate: ICandidate): void {
    this.editForm.patchValue({
      id: candidate.id,
      personalStatement: candidate.personalStatement,
      phone: candidate.phone,
      userId: candidate.userId,
      street: candidate.address?.street,
      postalCode: candidate.address?.postalCode,
      city: candidate.address?.city,
      state: candidate.address?.state,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const candidate = this.createFromForm();

    if (candidate.id !== undefined) {
      this.subscribeToSaveResponse(this.candidateService.update(candidate));
    } else {
      this.subscribeToSaveResponse(this.candidateService.create(candidate));
    }
  }

  private createFromForm(): ICandidate {
    const candidate: Candidate = new Candidate();

    // formulating the address
    this.address.city = this.editForm.get(['city'])!.value;
    this.address.postalCode = this.editForm.get(['postalCode'])!.value;
    this.address.state = this.editForm.get(['state'])!.value;
    this.address.street = this.editForm.get(['street'])!.value;
    candidate.address = this.address;

    candidate.id = this.editForm.get(['id'])!.value;
    candidate.personalStatement = this.editForm.get(['personalStatement'])!.value;
    candidate.phone = this.editForm.get(['phone'])!.value;
    candidate.userId = this.editForm.get(['userId'])!.value;
    candidate.degreeId = this.editForm.get(['degreeId'])!.value;
    candidate.seniorityLevelId = this.editForm.get(['seniorityLevelId'])!.value;

    return candidate;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICandidate>>): void {
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
