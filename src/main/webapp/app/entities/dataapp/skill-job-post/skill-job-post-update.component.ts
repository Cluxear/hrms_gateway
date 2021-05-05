import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISkillJobPost, SkillJobPost } from 'app/shared/model/dataapp/skill-job-post.model';
import { SkillJobPostService } from './skill-job-post.service';

@Component({
  selector: 'jhi-skill-job-post-update',
  templateUrl: './skill-job-post-update.component.html',
})
export class SkillJobPostUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    skillId: [],
    jobPostId: [],
  });

  constructor(protected skillJobPostService: SkillJobPostService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ skillJobPost }) => {
      this.updateForm(skillJobPost);
    });
  }

  updateForm(skillJobPost: ISkillJobPost): void {
    this.editForm.patchValue({
      id: skillJobPost.id,
      skillId: skillJobPost.skillId,
      jobPostId: skillJobPost.jobPostId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const skillJobPost = this.createFromForm();
    if (skillJobPost.id !== undefined) {
      this.subscribeToSaveResponse(this.skillJobPostService.update(skillJobPost));
    } else {
      this.subscribeToSaveResponse(this.skillJobPostService.create(skillJobPost));
    }
  }

  private createFromForm(): ISkillJobPost {
    return {
      ...new SkillJobPost(),
      id: this.editForm.get(['id'])!.value,
      skillId: this.editForm.get(['skillId'])!.value,
      jobPostId: this.editForm.get(['jobPostId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISkillJobPost>>): void {
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
