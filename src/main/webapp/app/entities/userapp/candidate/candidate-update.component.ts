import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Candidate, ICandidate } from 'app/shared/model/userapp/candidate.model';
import { CandidateService } from './candidate.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { Address, IAddress } from 'app/shared/model/userapp/address.model';
import { AddressService } from 'app/entities/userapp/address/address.service';
import { IDegreeLevel } from 'app/shared/model/userapp/degree-level.model';
import { DegreeLevelService } from 'app/entities/userapp/degree-level/degree-level.service';
import { ISeniorityLevel } from 'app/shared/model/userapp/seniority-level.model';
import { SeniorityLevelService } from 'app/entities/userapp/seniority-level/seniority-level.service';
import { IProfessionalExperience, ProfessionalExperience } from 'app/shared/model/userapp/professional-experience.model';
import { IAcademicExperience } from 'app/shared/model/userapp/academic-experience.model';
import { ICertification } from 'app/shared/model/userapp/certification.model';
import { ICountry } from 'app/shared/model/userapp/country.model';
import { AcademicExperienceService } from '../academic-experience/academic-experience.service';
import { ProfessionalExperienceService } from '../professional-experience/professional-experience.service';
import { CertificationService } from '../certification/certification.service';
import { CountryService } from '../country/country.service';
import { AccountService } from '../../../core/auth/account.service';
import { IApplication } from '../../../shared/model/applicationapp/application.model';
import moment from 'moment';
import { ConclusionType } from '../../../shared/model/enumerations/conclusion-type.model';
import { ApplicationService } from '../../applicationapp/application/application.service';
import { UserApplicationService } from '../../dataapp/user-application/user-application.service';
import { IUserApplication } from '../../../shared/model/dataapp/user-application.model';
import { NgbDateMomentAdapter } from '../../../shared/util/datepicker-adapter';

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
  academicExperiences: IAcademicExperience[] = [];
  certifications: ICertification[] = [];
  country: ICountry[] = [];
  exp: IProfessionalExperience[] = [];
  jobPostId: [] = [];

  editForm = this.fb.group({
    id: [],
    personalStatement: [],
    phone: [],
    firstName: String,
    lastName: String,
    email: String,
    street: String,
    postalCode: Number,
    city: String,
    state: String,
    addressId: Number,
    userId: [],
    address: [],
    degreeLevel: [],
    seniorityLevel: [],
    academicExperiences: [],
    certifications: [],
    country: [],
    professionalExperiences: this.fb.array([]),
  });

  constructor(
    protected candidateService: CandidateService,
    protected applicationService: ApplicationService,
    protected userApplicationService: UserApplicationService,
    protected accountService: AccountService,
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
    if (candidate.professionalExperience !== undefined) {
      this.exp = candidate.professionalExperience;
    }

    this.editForm.patchValue({
      id: candidate.id,
      personalStatement: candidate.personalStatement,
      firstName: candidate.firstName,
      lastName: candidate.lastName,
      email: candidate.email,
      phone: candidate.phone,
      userId: candidate.userId,
      street: candidate.address?.street,
      postalCode: candidate.address?.postalCode,
      city: candidate.address?.city,
      state: candidate.address?.state,
      addressId: candidate.address?.id,
      professionalExperiences: this.profExpToFormArray(this.exp),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const candidate = this.createFromForm();

    // TODO: if id is defined in route params use it, otherwise use current user's id

    /*

        set userId only if id isn't already defined.
     */
    candidate.login = this.accountService.getLogin();
    let jobPostId: number;
    this.activatedRoute.params.subscribe(param => {
      jobPostId = param.jpid;
      if (jobPostId) {
        const application = {} as IApplication;

        application.shortListed = false;
        application.creationDate = moment(Date.now());
        application.conclusion = ConclusionType.PENDING;

        this.applicationService.create(application).subscribe(app => {
          application.id = app.body?.id;
          const userapplication = {} as IUserApplication;
          userapplication.applicationId = application.id;
          userapplication.userId = candidate.login;
          userapplication.jobPostId = jobPostId;

          this.userApplicationService.create(userapplication).subscribe(() => this.onSaveSuccess());
        });
      }
    });

    this.formArrayToProfExp(candidate);
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
    this.address.id = this.editForm.get(['addressId'])!.value;
    candidate.firstName = this.editForm.get(['firstName'])!.value;
    candidate.lastName = this.editForm.get(['lastName'])!.value;
    candidate.email = this.editForm.get(['email'])!.value;
    candidate.address = this.address;
    candidate.userId = this.editForm.get(['userId'])!.value;
    candidate.id = this.editForm.get(['id'])!.value;
    candidate.personalStatement = this.editForm.get(['personalStatement'])!.value;
    candidate.phone = this.editForm.get(['phone'])!.value;
    candidate.professionalExperience = this.editForm.get(['professionalExperiences'])!.value;

    return candidate;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICandidate>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected subscribeToSaveResponseUser(result: Observable<HttpResponse<IUser>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }
  protected dateToMoment(candidate: Candidate): void {
    candidate.professionalExperience!.forEach(exp => {
      //exp.startDate = ngbMomentDate.toModel(exp.startDate);
    });
  }
  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
  get professionalExperiences(): FormArray {
    return this.editForm.get('professionalExperiences') as FormArray;
  }

  protected profExpToFormArray(exp: ProfessionalExperience[]): void {
    const ngbMomentDate: NgbDateMomentAdapter = new NgbDateMomentAdapter();

    // itterate over every element of the array
    if (exp && exp.length > 0) {
      exp.forEach(element => {
        this.professionalExperiences.push(
          this.fb.group({
            id: element.id,
            place: element.place,
            post: element.post,
            description: element.description,
            startDate: ngbMomentDate.fromModel(element.startDate!),
            endDate: ngbMomentDate.fromModel(element.endDate!),
            candidateId: element.candidateId,
          })
        );
      });
    }
  }
  protected formArrayToProfExp(candidate: Candidate): void {
    const profExp: ProfessionalExperience[] = new Array(this.professionalExperiences.length);
    // itterate over every element of the array
    candidate.professionalExperience?.map((v, index) => this.professionalExperiences.at(index) as FormArray);
  }
  addProfessionalExperience(): void {
    this.professionalExperiences.push(
      this.fb.group({
        place: '',
        post: '',
        description: '',
        startDate: '',
      })
    );
  }
  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
