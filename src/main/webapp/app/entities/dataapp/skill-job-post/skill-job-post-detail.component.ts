import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISkillJobPost } from 'app/shared/model/dataapp/skill-job-post.model';

@Component({
  selector: 'jhi-skill-job-post-detail',
  templateUrl: './skill-job-post-detail.component.html',
})
export class SkillJobPostDetailComponent implements OnInit {
  skillJobPost: ISkillJobPost | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ skillJobPost }) => (this.skillJobPost = skillJobPost));
  }

  previousState(): void {
    window.history.back();
  }
}
