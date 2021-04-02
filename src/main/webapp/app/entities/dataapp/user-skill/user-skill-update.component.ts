import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IUserSkill, UserSkill } from 'app/shared/model/dataapp/user-skill.model';
import { UserSkillService } from './user-skill.service';

@Component({
  selector: 'jhi-user-skill-update',
  templateUrl: './user-skill-update.component.html',
})
export class UserSkillUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    userId: [],
    skillId: [],
    skillLevel: [],
  });

  constructor(protected userSkillService: UserSkillService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userSkill }) => {
      this.updateForm(userSkill);
    });
  }

  updateForm(userSkill: IUserSkill): void {
    this.editForm.patchValue({
      id: userSkill.id,
      userId: userSkill.userId,
      skillId: userSkill.skillId,
      skillLevel: userSkill.skillLevel,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userSkill = this.createFromForm();
    if (userSkill.id !== undefined) {
      this.subscribeToSaveResponse(this.userSkillService.update(userSkill));
    } else {
      this.subscribeToSaveResponse(this.userSkillService.create(userSkill));
    }
  }

  private createFromForm(): IUserSkill {
    return {
      ...new UserSkill(),
      id: this.editForm.get(['id'])!.value,
      userId: this.editForm.get(['userId'])!.value,
      skillId: this.editForm.get(['skillId'])!.value,
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
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
