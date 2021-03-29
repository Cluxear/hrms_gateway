import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDomain, Domain } from 'app/shared/model/skillapp/domain.model';
import { DomainService } from './domain.service';
import { ISkill } from 'app/shared/model/skillapp/skill.model';
import { SkillService } from 'app/entities/skillapp/skill/skill.service';

@Component({
  selector: 'jhi-domain-update',
  templateUrl: './domain-update.component.html',
})
export class DomainUpdateComponent implements OnInit {
  isSaving = false;
  skills: ISkill[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    skillId: [],
  });

  constructor(
    protected domainService: DomainService,
    protected skillService: SkillService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ domain }) => {
      this.updateForm(domain);

      this.skillService.query().subscribe((res: HttpResponse<ISkill[]>) => (this.skills = res.body || []));
    });
  }

  updateForm(domain: IDomain): void {
    this.editForm.patchValue({
      id: domain.id,
      name: domain.name,
      skillId: domain.skillId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const domain = this.createFromForm();
    if (domain.id !== undefined) {
      this.subscribeToSaveResponse(this.domainService.update(domain));
    } else {
      this.subscribeToSaveResponse(this.domainService.create(domain));
    }
  }

  private createFromForm(): IDomain {
    return {
      ...new Domain(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      skillId: this.editForm.get(['skillId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDomain>>): void {
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

  trackById(index: number, item: ISkill): any {
    return item.id;
  }
}
