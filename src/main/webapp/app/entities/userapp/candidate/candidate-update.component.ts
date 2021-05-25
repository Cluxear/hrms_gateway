import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, UrlSegment } from '@angular/router';
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
import {AcademicExperience, IAcademicExperience} from 'app/shared/model/userapp/academic-experience.model';
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
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { SkillService } from '../../skillapp/skill/skill.service';
import { ISkill, Skill } from '../../../shared/model/skillapp/skill.model';
import { PositionService } from 'app/entities/userapp/position/position.service';
import { IPosition } from 'app/shared/model/userapp/position.model';
import { IUserDetails, UserDetails } from 'app/shared/model/userapp/cvUserDetails.model';
import {finished} from "stream";
import {IExperienceDuration} from "app/shared/model/userapp/experience-duration.model";
import {ExperienceDurationService} from "app/entities/userapp/experience-duration/experience-duration.service";

type SelectableEntity = IUser | IAddress | IDegreeLevel | ISeniorityLevel | ISkill | IPosition | IExperienceDuration;

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
  academicExperience: IAcademicExperience[] = [];
  experienceDurations: IExperienceDuration[] = [];
  certifications: ICertification[] = [];
  country: ICountry[] = [];
  exp: IProfessionalExperience[] = [];
  jobPostId: [] = [];
  availableSkills: ISkill[] = [];
  skills: ISkill[] = [];
  candidateSaved: ICandidate = new Candidate();
  positions: IPosition[] = [];
  url: UrlSegment[] = [];
  _candidate: ICandidate = new Candidate();

  currentIndex = -1;
  currentIndexExpAcademic = -1;
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
    experienceDurationId: [],

    certifications: [],
    country: [],
    degreeId: [],
    allSkills: [],
    skills: this.fb.array([]),
    professionalExperiences: this.fb.array([]),
    academicExperiences: this.fb.array([]),
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
    protected experienceDurationService: ExperienceDurationService,
    protected positionService: PositionService,
    protected skillService: SkillService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ candidate }) => {
      this._candidate = candidate;
      this.updateForm(candidate);

      //getting candidateId

      /*   if(candidate.id !== undefined) {
        this.skillService.findSkillsByUserId(candidate.id).subscribe((res: HttpResponse<ISkill[]>) => (this.skills = res.body || []));
      }*/

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



      this.seniorityLevelService.query().subscribe((res: HttpResponse<ISeniorityLevel[]>) => (this.senioritylevels = res.body || []));
      */
    });
    this.degreeLevelService.query().subscribe((res: HttpResponse<IDegreeLevel[]>) => {
      (this.degreelevels = res.body || []);
    },

      () => {

      },
      ()=> {
        this.degreelevels.forEach((val, index) => {


          if (val.name === this._candidate.degreeName) {

            val.selected = true;
          }

        });
      })
    this.skillService.query().subscribe((res: HttpResponse<ISkill[]>) => (this.availableSkills = res.body || []));
    this.positionService.query().subscribe((res: HttpResponse<IPosition[]>) => (this.positions = res.body || []));
    this.experienceDurationService.query().subscribe(
      (res: HttpResponse<IExperienceDuration[]>) => {
        this.experienceDurations = res.body || [];},
      () => {

      },
      ()=> {
        this.experienceDurations.forEach((val, index) => {


          if (val.id === this._candidate.experienceDurationId) {

            val.selected = true;
          }
        })
      });

        }

  updateForm(candidate: ICandidate): void {
    if (candidate.professionalExperience !== undefined) {
      this.currentIndex = 0;
      this.exp = candidate.professionalExperience;
    }
    if (candidate.academicExperience !== undefined) {
      this.currentIndexExpAcademic = 0;
      this.academicExperience = candidate.academicExperience;
    }


    this.editForm.patchValue({
      id: candidate.id != null ? candidate.id : '',
      personalStatement: candidate.personalStatement != null ? candidate.personalStatement : '',
      firstName: candidate.firstName != null ? candidate.firstName : '',
      lastName: candidate.lastName,
      email: candidate.email,
      phone: candidate.phone,
      experienceDurationId: candidate.experienceDurationId,
      userId: candidate.userId,
      street: candidate.address?.street,
      postalCode: candidate.address?.postalCode,
      city: candidate.address?.city,
      state: candidate.address?.state,
      addressId: candidate.address?.id,
      skills: this.skillToFormArray(candidate.skills!),
      allSkills: this.availableSkills,
      professionalExperiences: this.profExpToFormArray(this.exp),
      academicExperiences: this.acadExpToFormArray(this.academicExperience),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const candidate = this.createFromForm();
    let skills: ISkill[];
    // the skills already existing will be updated
    candidate.login = this.accountService.getLogin();
    // TODO: if id is defined in route params use it, otherwise use current user's id

    /*

        set userId only if id isn't already defined.
     */
    // skills are saved with userSkillService

    if (candidate.id !== undefined) {
      this.subscribeToSaveResponse(this.candidateService.update(candidate));
    } else {
      this.subscribeToSaveResponse(this.candidateService.create(candidate));
    }

    this.formArrayToProfExp(candidate);
  }

  private createFromForm(): ICandidate {
    const candidate: Candidate = new Candidate();
    const ngbMomentDate: NgbDateMomentAdapter = new NgbDateMomentAdapter();
    //  let testArray: FormArray = new FormArray([]);

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
    candidate.experienceDurationId = this.editForm.get(['experienceDurationId'])!.value;
    candidate.userId = this.editForm.get(['userId'])!.value;
    candidate.id = this.editForm.get(['id'])!.value;
    candidate.personalStatement = this.editForm.get(['personalStatement'])!.value;
    candidate.phone = this.editForm.get(['phone'])!.value;
    candidate.skills = this.editForm.get(['skills'])!.value;
    candidate.degreeId = this.editForm.get(['degreeId'])!.value;

    const exp = this.professionalExperiences;
    const acad = this.academicExperiences;
    const test = this.convertDateFromFormArray(exp);
    const test2 = this.convertDateFromFormArray(acad);



    candidate.professionalExperience = test.value;
    candidate.academicExperience = test2.value;
    return candidate;
  }
  protected convertDateFromFormArray(profExp: FormArray): FormArray {
    const ngbMomentDate: NgbDateMomentAdapter = new NgbDateMomentAdapter();
    if (profExp) {
      profExp.controls.forEach(exp => {

        const startDate = ngbMomentDate.toModel(exp['startDate']);
        exp['startDate'] = startDate;
        const endDate = ngbMomentDate.toModel(exp['endDate']);
        exp['endDate'] = endDate;

      });
    }
    return profExp;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICandidate>>): void {
    result.subscribe(
      cand => {
        this.candidateSaved = cand.body!;
        this.createAnApplication();
        this.onSaveSuccess();
      },
      () => this.onSaveError()
    );
  }

  protected createAnApplication(): void {
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

          userapplication.userId = this.candidateSaved.id;
          userapplication.jobPostId = jobPostId;

          this.userApplicationService.create(userapplication).subscribe(() => this.onSaveSuccess());
        });
      }
    });
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

  get academicExperiences(): FormArray {
    return this.editForm.get('academicExperiences') as FormArray;
  }
  get userskills(): FormArray {
    return this.editForm.get('skills') as FormArray;
  }

  protected skillToFormArray(exp: ISkill[]): void {
    // itterate over every element of the array
    // what do we want to show for each skill from the server : the skill and its level.

    if (exp && exp.length > 0) {
      exp.forEach(element => {
        this.userskills.push(
          this.fb.group({
            id: element.id,
            skillLevel: element.skillLevel,
            name: element.name,
            changeable: false,
          })
        );
      });
    }
  }
  protected acadExpToFormArray(acad: AcademicExperience[]): void {
    const ngbMomentDate: NgbDateMomentAdapter = new NgbDateMomentAdapter();
    let position: IPosition;
    // iterate over every element of the array
    if (acad && acad.length > 0) {
      acad.forEach(element => {


        this.academicExperiences.push(
          this.fb.group({
            id: element.id,
            place: element.place,
            degreeName: element.degreeName,
            description: element.description,
            startDate: ngbMomentDate.fromModel(moment(element.startDate)),
            startDay: ngbMomentDate.fromModel(moment(element.startDate))!.day,
            startMonth: ngbMomentDate.fromModel(moment(element.startDate))!.month,
            startYear: ngbMomentDate.fromModel(moment(element.startDate))!.year,
            endDay: ngbMomentDate.fromModel(moment(element.endDate))!.day,
            endMonth: ngbMomentDate.fromModel(moment(element.endDate))!.month,
            endYear: ngbMomentDate.fromModel(moment(element.endDate))!.year,
            endDate: ngbMomentDate.fromModel(moment(element.endDate)),
            candidateId: element.candidateId,
          })
        )


      })
    }
  }
  protected profExpToFormArray(exp: ProfessionalExperience[]): void {
    const ngbMomentDate: NgbDateMomentAdapter = new NgbDateMomentAdapter();
    let position: IPosition;
    // iterate over every element of the array
    if (exp && exp.length > 0) {
      exp.forEach(element => {


        if (element.positionId) {
          this.positionService.find(element.positionId).subscribe(val => {
            position = val.body!;
            this.professionalExperiences.push(
              this.fb.group({
                id: element.id,
                place: element.place,
                positionId: position.id,
                description: element.description,
                startDate: ngbMomentDate.fromModel(moment(element.startDate)),
                startDay: ngbMomentDate.fromModel(moment(element.startDate))!.day,
                startMonth: ngbMomentDate.fromModel(moment(element.startDate))!.month,
                startYear: ngbMomentDate.fromModel(moment(element.startDate))!.year,
                endDay: ngbMomentDate.fromModel(moment(element.endDate))!.day,
                endMonth: ngbMomentDate.fromModel(moment(element.endDate))!.month,
                endYear: ngbMomentDate.fromModel(moment(element.endDate))!.year,
                endDate: ngbMomentDate.fromModel(moment(element.endDate)),
                candidateId: element.candidateId,
              })
            );
          });
        }
      });
    }
  }
  protected formArrayToProfExp(candidate: Candidate): void {
    const profExp: ProfessionalExperience[] = new Array(this.professionalExperiences.length);
    // itterate over every element of the array
    candidate.professionalExperience?.map((v, index) => this.professionalExperiences.at(index) as FormArray);
  }
  addProfessionalExperience(): void {
    this.currentIndex += 1;
    this.professionalExperiences.push(
      this.fb.group({
        place: '',
        positionId: '',
        description: '',
        startDate: '',
        endDate: '',
      })
    );
  }
  addAcademicExperience() : void {
    this.currentIndexExpAcademic += 1;
    this.academicExperiences.push(
      this.fb.group({
        place: '',
        degreeName:'',
        description: '',
        startDate: '',
        endDate: '',
      })
    );

  }

  next() : void {

    this.currentIndex +=1;
  }
  previous() : void {

    this.currentIndex -=1;
  }
  previousAcad() : void {
    this.currentIndexExpAcademic -=1;
  }

  nextAcad() : void  {
    this.currentIndexExpAcademic +=1;
  }
  isLastExp() : boolean {
     return  !(this.currentIndex + 1 < this.professionalExperiences.length);
  }
  isFirstExp() : boolean {
    return !(this.currentIndex - 1 >= 0) ;
  }

  isFirstAcadExp() : boolean {
    return !(this.currentIndexExpAcademic - 1 >= 0) ;
  }

  isLastAcadExp() : boolean{
    return  !(this.currentIndexExpAcademic + 1 < this.academicExperiences.length);
  }
  addSkill(): void {
    this.userskills.push(
      this.fb.group({
        id: '',
        skillLevel: '',
        name: '',
        changeable: true,
      })
    );
  }
  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
  trackByName(index: number, item: ISkill): string {
    return item.name!;
  }

  findPosition(control: number): number {
    return this.positions.findIndex(pos => {
      return pos.id === control;
    });
  }
  uploadFile(event: Event): void {
    // TODO: check user authority and based on it update accordingly
    const HTMLevent = event as HTMLInputEvent;
    const file: File = (HTMLevent.target.files as FileList)[0];
    /** call the extract  **/
    let userDetails: IUserDetails = new UserDetails();
    this.userService.getUserInfoFromCV(file).subscribe(res => {

      userDetails = res.body!;

      this._candidate.firstName = userDetails.info_perso?.firstName;
      this._candidate.lastName = userDetails.info_perso?.lastName;
      this._candidate.email = userDetails.info_perso?.email;
      this.updateForm(this._candidate);
    });

    //file.text().then(fi => console.log(fi.toString()));
  }
  selectEducationLevel() : void {
      //degreeLevel

  }



}
