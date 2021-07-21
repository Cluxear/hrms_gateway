import {Component, Input, OnInit} from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISkill, Skill } from 'app/shared/model/skillapp/skill.model';
import { SkillService } from './skill.service';
import {IUser} from "app/core/user/user.model";
import {IAddress} from "app/shared/model/userapp/address.model";
import {IDegreeLevel} from "app/shared/model/userapp/degree-level.model";
import {ISeniorityLevel} from "app/shared/model/userapp/seniority-level.model";
import {IPosition} from "app/shared/model/userapp/position.model";
import {IExperienceDuration} from "app/shared/model/userapp/experience-duration.model";
import {IUserSkill, UserSkill} from "app/shared/model/dataapp/user-skill.model";
import {UserSkillService} from "app/entities/dataapp/user-skill/user-skill.service";

type SelectableEntity = IUser | IAddress | IDegreeLevel | ISeniorityLevel | ISkill | IPosition | IExperienceDuration;

@Component({
  selector: 'jhi-skill-candidate-update',
  templateUrl: './skill.candidate.update.component.html',
})
export class SkillCandidateUpdateComponent implements OnInit {
  isSaving = false;
  availableSkills: ISkill[] = [];

  editForm = this.fb.group({
    skillId: [],
    skillLevel: [],
  });
  @Input() userId?: string;

  constructor(protected userSkillService: UserSkillService,protected skillService: SkillService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {

    this.skillService.query().subscribe((res: HttpResponse<ISkill[]>) => (this.availableSkills = res.body || []));


  }



  previousState(): void {
    window.history.back();
  }
  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
  save(): void {
    this.isSaving = true;
    const userskill = this.createFromForm();

      this.subscribeToSaveResponse(this.userSkillService.create(userskill));

  }

  private createFromForm(): IUserSkill {
    return {
      ...new UserSkill(),

      skillId: this.editForm.get(['skillId'])!.value,
      userId: this.userId,
      skillLevel: this.editForm.get(['skillLevel'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserSkill>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
   //   this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
