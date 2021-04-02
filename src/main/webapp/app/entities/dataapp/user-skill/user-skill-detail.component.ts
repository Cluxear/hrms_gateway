import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserSkill } from 'app/shared/model/dataapp/user-skill.model';

@Component({
  selector: 'jhi-user-skill-detail',
  templateUrl: './user-skill-detail.component.html',
})
export class UserSkillDetailComponent implements OnInit {
  userSkill: IUserSkill | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userSkill }) => (this.userSkill = userSkill));
  }

  previousState(): void {
    window.history.back();
  }
}
